const { exec } = require("child_process");
const filesize = require("filesize");
const fs = require("fs");
const glob = require("glob");
const sharp = require("sharp");
const pt = require("path");

function withSize(path) {
    const size = fs.statSync(path).size;
    return { path, size };
}

function addSizes(itemsWithSize) {
    return itemsWithSize.reduce((sum, item) => {
        return sum + item.size;
    }, 0);
}

const MAX_WIDTH_PIXELS = 1280;

const successfulPaths = [];
const erroredPaths = {};

function formatSize(size) {
    return filesize(size, { pad: true }).padStart(12);
}

const MIN_SUFFIX = "-min";
const FILETYPES = ["jpg", "jpeg", "png"];

function formatMinPath(path) {
    const parsed = pt.parse(path);
    const min = `${parsed.dir}/${parsed.name}${MIN_SUFFIX}${parsed.ext}`;
    return min;
}

function isMinifiedCopy(path) {
    return !path.includes(MIN_SUFFIX);
}

function minifiedCopyNotExists(path) {
    return !fs.existsSync(formatMinPath(path));
}

function optimize(path) {
    return sharp(path)
        .resize({
            width: MAX_WIDTH_PIXELS,
            fit: "inside",
            withoutEnlargement: true,
        })
        .jpeg({
            progressive: true,
            force: false,
        })
        .png({
            force: false,
            colors: 256,
            compressionLevel: 9,
        })
        .toBuffer();
}

async function run(path, reprocess) {
    try {
        const minPath = formatMinPath(path);
        if (!fs.existsSync(minPath) || reprocess) {
            console.log("[PROCESSING]", path);
            const buffer = await optimize(path);
            fs.writeFileSync(minPath, buffer);
        }
        successfulPaths.push(path);
    } catch (err) {
        console.log("[FAILED]", path, "\n", err);
        erroredPaths[path] = {
            message: err.message,
            fileName: err.fileName,
            lineNumber: err.lineNumber,
        };
    }
}

function printHelp() {
    console.log(`
  This tool produces minified copies with -min appended to their names
  before the extension and optionally fixes documents that use the
  unoptimized version of images (see '--fix').

  If you run with '--fix', make sure to do it on a clean branch in case
  of erroneous updates. The tool just runs 'sed' under the hood.

  USAGE:

      yarn optimize-images [OPTIONS]

  OPTIONS:

      -r, --reprocess Images for which a -min version already exists will
                      be skipped. To force reprocessing these images, pass
                      the --reprocess option.
      -f, --fix       After processing, runs 'sed' to update existing links
                      to unoptimized images in place.
      -h, --help      Show this help message and exit.
    `);
}

const help = process.argv.includes("--help") || process.argv.includes("-h");
if (help) {
    printHelp();
    process.exit(0);
}

glob(
    `./static/**/*.{${FILETYPES.join(",")}}`,
    async function (error, allImages) {
        if (error) return error;
        const reprocess =
            process.argv.includes("--reprocess") || process.argv.includes("-r");
        const originalImages = allImages.filter(isMinifiedCopy);
        const images = reprocess
            ? originalImages
            : originalImages.filter(minifiedCopyNotExists);
        const sizesBefore = images.map(withSize);

        for (const path of images) {
            await run(path, reprocess);
        }

        const longestPathLength = Math.max(
            0,
            ...images.map((path) => path.length)
        );
        const sizesAfter = images.map(formatMinPath).map(withSize);
        const sizeComparison = sizesBefore
            .map((item, index) => ({
                path: item.path.padEnd(longestPathLength),
                before: formatSize(item.size),
                after: formatSize(sizesAfter[index].size),
                saved: formatSize(item.size - sizesAfter[index].size),
                savedSize: item.size - sizesAfter[index].size,
            }))
            .sort((a, b) => b.savedSize - a.savedSize);

        if (sizeComparison.length) {
            console.table(sizeComparison.map(({ savedSize, ...rest }) => rest));
        } else {
            console.log(
                "No images needed to be optimized. To reprocess, pass the --reprocess option."
            );
        }

        const sizeBefore = addSizes(sizesBefore);
        const sizeAfter = addSizes(sizesAfter);
        const savedTotal = sizeBefore - sizeAfter;

        console.log(`Total size before: ${formatSize(sizeBefore)}`);
        console.log(`Total size after:  ${formatSize(sizeAfter)}`);
        console.log(`Space saved:       ${formatSize(savedTotal)}`);

        const fix =
            process.argv.includes("--fix") || process.argv.includes("-f");
        if (fix) {
            const dir = pt.dirname(require.main.filename);
            FILETYPES.forEach((filetype) => {
                const sedExpression = `/${MIN_SUFFIX}.${filetype}/! s/\\.${filetype}/${MIN_SUFFIX}.${filetype}/g`;
                const command = `find ${dir}/{docs,blog} -path '**/*.mdx' -type f -exec sed -i -e '${sedExpression}' {} \\;`;
                console.log(`Fixing .${filetype} references: ${command}`);
                // brace expansion is a bash feature
                exec(command, { shell: "bash" }, (err, stdout, stderr) => {
                    if (err) {
                        console.error(err);
                    }
                    if (stdout) {
                        console.log(stdout);
                    }
                    if (stderr) {
                        console.error(stderr);
                    }
                });
            });
        }
    }
);
