---
id: uploading-android-bugreports
title: Uploading Android Bugreports & Symbols
sidebar_label: Uploading Android Bugreports & Symbols
---

## Using the Memfault CLI tool to upload

The easiest way to upload Android bugreport and/or symbol files is using the
Memfault CLI tool.

To install it, make sure you have a recent version of Python 3.x installed.

Tip: use a
[virtualenv](https://packaging.python.org/tutorials/installing-packages/#creating-virtual-environments)
to avoid conflicts with dependencies of other projects that use Python

Then run `pip3 install memfault-cli` to install it.

Once installed, the `memfault` command should be available in your shell:

```bash
$ memfault
Usage: memfault [OPTIONS] COMMAND [ARGS]...

Options:
  --email TEXT     Account email to authenticate with  [required]
  --password TEXT  Account password or user API key to authenticate with
                   [required]
  --org TEXT       Organization slug  [required]
  --project TEXT   Project slug  [required]
  --help           Show this message and exit.

Commands:
  upload-bugreport
  upload-symbols
```

### Uploading Android binary symbol files

When processing traces from a bugreport.zip, Memfault will attempt to provide
source file and line numbers for stackframes from native binaries. In order to
do this, the symbol files for these native binaries need to be uploaded to
Memfault.

When building the Android OS, the final image will contain executables from
which the symbols (debug info) has been stripped. Usually, "unstripped" versions
of the executables are also kept in the build output. For example, in builds of
recent versions of AOSP, they are output in
`out/target/product/generic/symbols/**`. The exact location may be a bit
different for your project. To test
[whether a file contains symbols, check out this article](/troubleshooting/uploading-symbol-file-is-invalid.md).

To upload all symbol files, run this command:

```bash
$ memfault --email <EMAIL> --password <PASSWORD> --org <ORG_SLUG> \
    --project <PROJ_SLUG> upload-symbols out/target/product/generic/symbols
```

It's best to hook this into Continuous Integration when a build is released for
internal consumption so that Memfault will immediately have the ability to
symbolicate crashes.

The command will run through all files in the given directory. For each file, it
will check whether it's a symbol file that has not yet been uploaded and upload
it if necessary. The output of the command looks like this:

```text
INFO: /aosp/symbols/out/target/product/vsoc_x86/symbols/init: ELF file with .debug_info and GNU Build ID: 706b026c8cc3e970b409d79c11c182a5
INFO: /aosp/symbols/out/target/product/vsoc_x86/symbols/init: uploaded!
INFO: /aosp/symbols/out/target/product/vsoc_x86/symbols/apex/com.android.adbd/bin/adbd: ELF file with .debug_info and GNU Build ID: 37398ca3d0492ba8b1e708a13ab2f9e0
INFO: /aosp/symbols/out/target/product/vsoc_x86/symbols/apex/com.android.adbd/bin/adbd: uploaded!
INFO: /aosp/symbols/out/target/product/vsoc_x86/symbols/apex/com.android.adbd/lib/libcrypto.so: ELF file with .debug_info and GNU Build ID: a2a7ab7cea9d8c482f31b3ee3a71c5ee
INFO: /aosp/symbols/out/target/product/vsoc_x86/symbols/apex/com.android.adbd/lib/libcrypto.so: skipping, already uploaded.
... etc ...
```

### Uploading an Android bugreport.zip

To upload a bugreport.zip file that is located at, for example
`/path/to/bugreport.zip`, run this command:

```bash
$ memfault --email <EMAIL> --password <PASSWORD> --org <ORG_SLUG> \
    --project <PROJ_SLUG> upload-bugreport /path/to/bugreport.zip
```

Note: support for passing a `Memfault-Project-Key` instead of email, password,
org and project to the tool is coming soon.

## Uploading without the Memfault CLI tool

Uploading is a 3 step process:

1. "Prepare" the file upload by making a `POST` request to `/api/v0/upload` to
   obtain a `upload_url` and `token`.
2. Make a `PUT` request to the `upload_url` to upload the file.
3. Finally, make a `POST` request with the `token` to the appropriate upload
   processing API. For example, after uploading an Android Bugreport file,
   `POST` the `token` to `/api/v0/upload/bugreport`.

Please consult the [HTTP API documentation](https://api-docs.memfault.com) for
details on each of the requests.
