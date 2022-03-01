#!/usr/bin/env python3
"""
Check a set of files for mismatch between 'id: xxx' and file
basename-without-extension.

For example, a file named 'foo.md' should have an id of 'foo':

```markdown
id: not-foo
```

❯ ./check-id.py foo.md
Mismatch in foo.md:
        ID: not-foo
  Basename: foo
"""

import sys
import re
import os


def get_mismatched_ids(files):
    mismatches = []

    for file in files:
        with open(file, "r") as fp:
            for line in fp:
                if m := re.match(r"^id: (.*)$", line.strip()):
                    id = m.group(1)
                    _, basename = os.path.split(file)
                    basename_no_ext, _ = os.path.splitext(basename)
                    if basename_no_ext != id:
                        mismatches.append((file, id, basename_no_ext))

    return mismatches


def main():

    mismatches = get_mismatched_ids(sys.argv[1:])

    for file, id, basename_no_ext in mismatches:
        print(f"Mismatch in {file}:")
        print(f"        ID: {id}")
        print(f"  Basename: {basename_no_ext}")
        print()

    if mismatches:
        print(
            "Error: found some files with 'id:' value not matching the filename. Either"
            " rename the file or update the id: value to match"
        )
        exit(1)


if __name__ == "__main__":
    main()
