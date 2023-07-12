---
id: quickstart-raspberrypi
title: Quick Start with Raspberry Pi
sidebar_label: Quick Start (Raspberry Pi)
---

import { ProjectMagicLink } from "@site/src/components/ProjectMagicLink";

This tutorial will walk you through building a complete Linux system image
for a RaspberryPi using Yocto, flashing this image to an SD-Card, booting the
RaspberryPi for the first time and then updating the image using Memfault's
OTA solution.

This tutorial works with Raspberry Pis model 2, 3 or 4.

If you do not have access to a Raspberry Pi, you can [use our QEMU based
quickstart][quickstart-qemu] which will take you through the same steps using
an emulator.

If you already have your own Yocto-based distribution, we recommend following
our [integration guide][integration-guide] to learn how to add the Memfault SDK.

:::note

We will not cover setting up the WiFi connection of your Raspberry Pi in this
guide. Be prepared to connect your Raspberry Pi with an ethernet cable.

:::

[quickstart-qemu]: /docs/linux/quickstart
[integration-guide]: /docs/linux/integration-guide/

## Build and Run Linux with Memfault SDK

### Create a Memfault Project

Go to [app.memfault.com](https://app.memfault.com) and from the "Select a
Project" dropdown, click on "Create Project". Once you're done, you can find a
project key, referenced as `YOUR_PROJECT_KEY` in this document, in the Project
settings page.

### Download Memfault Linux SDK

Checkout the [Memfault Linux SDK][sdk] on your computer.

The instructions on this guide are compatible with Linux and macOS (Intel and
Apple Silicon). Windows users should be able to follow along with minimal
adjustments.

[sdk]: https://github.com/memfault/memfault-linux-sdk/

### Create a Docker container to build with Yocto

We provide a [`Dockerfile`][dockerfile] to create a container with a recent
version of Ubuntu and all the dependencies required to build Yocto. The
[`run.sh`][run.sh] script will start the container with two Docker volumes
attached (one for sources and one for build artifacts). This makes the build
artifacts easier to manage and enables Yocto build cache.

This container comes with a few pre-defined configuration variables (in
`docker/env.list`). We will override the type of machine and the memfault
project key before starting it.

```
$ cd /path/to/memfault-linux-sdk/docker
$ export MACHINE=raspberrypi3
$ export MEMFAULT_HARDWARE_VERSION=raspberrypi3
$ export MEMFAULT_PROJECT_KEY=<YOUR_PROJECT_KEY>
$ ./run.sh -b
```

The container will start, install some dependencies and download the source
code for all the Yocto layers used in the build.

### Build your Yocto-based image

To build the image, run:

```
$ bitbake memfault-image
```

This will take a long time the first time (from 30 minutes to a few hours).

:::tip

If Docker seems to hang for a long time (build output not updating, CPU usage
low) you may have run out of available space allocated to Docker. Check the
Docker console for limits on system resources.

You need approximately 50 GB of free space for the build.

:::

[dockerfile]: https://github.com/memfault/memfault-linux-sdk/blob/-/docker/Dockerfile
[run.sh]: https://github.com/memfault/memfault-linux-sdk/blob/-/docker/run.sh

### Flash your image on a SD Card

When the build process completes, you will find an image ready to flash
in `tmp/deploy/images/raspberrypi3/base-image-raspberrypi3.wic`.

To transfer this image from the Docker container to your desktop you can run:

```
$ docker cp -L memfault-linux-qemu:/home/build/yocto/build/tmp/deploy/images/$MACHINE/base-image-$MACHINE.wic.bz2 .
```

(Note that we are using the `.bz2` compressed image that was automatically
built).

You can flash this image like any Raspberry Pi image. We recommend
[Balena Etcher][balena-etcher].

[balena-etcher]: https://www.balena.io/etcher#download-etcher

### Test the image on a Raspberry Pi

Insert the SDCard in your Raspberry Pi and boot.

Login as `root` (no password) and make sure to enable data-collection (disabled
by default).

```
# memfaultctl enable-data-collection
```

You can now use `memfaultctl` to generate events on the device. They will appear
in your&nbsp;<ProjectMagicLink path="/"><b>Dashboard</b></ProjectMagicLink>.

```
# memfaultctl trigger-coredump
# memfaultctl write-attributes QUICK_START=COMPLETE
# memfaultctl reboot --reason 4 # Reboot with "Low-Battery Reason"
```

:::tip

Keep in mind that to save bandwidth `memfaultd` queues events and does not
upload them immediately. To flush the queue more often you can use [developer
mode][developer-mode] and/or `memfaultctl sync`.

:::

## Use Memfault OTA to update your Raspberry Pi

### Configure the new image

By default, your software version is `0.0.1` (this is provided by `docker/env.list`). For this
update, let's set the version number to `0.0.2`:

```
  # On your machine - before restarting the docker container
  $ export MEMFAULT_SOFTWARE_VERSION=0.0.2

  # Make sure the variables we defined earlier are still present
  $ echo $MEMFAULT_PROJECT_KEY $MACHINE $MEMFAULT_HARDWARE_VERSION

  # Re-start the container
  $ ./run.sh
```

If you would like to make this update more interesting you can edit
`conf/local.conf` and add some Yocto packages:

```
  $ echo 'IMAGE_INSTALL:append = " openssh"' >> conf/local.conf
```

### Build the new image

Build the swupdate image with:

```
  $ bitbake swupdate-image
```

You will notice that the build runs much faster this time. Yocto build
system is smart enough to only rebuild what has changed, which is very little
here.

### Deploy the new image

In the same output folder, you will find a `.swu` file. This is the swupdate
OTA package.

Copy it out of the Docker container:

```
  # On your host shell - not inside Docker
  docker cp -L memfault-linux-qemu:/home/build/yocto/build/tmp/deploy/images/$MACHINE/swupdate-image-$MACHINE.swu .
```

You can now visit your project in Memfault Dashboard and:

- Click on "Software" -> "OTA Releases" -> "Create Release"
  - Version is 0.0.2
  - Click "Create"
- Click "Add OTA Payload to Release"
  - Hardware Version is `raspberrypi3` (adjust for your specific hardware)
  - Software type is `main` (this was defined for you in `docker/env.list`)
  - Add the `.swu` package for upload
  - Click "Add"
- Now click on "Activate" in the top-right corner and "Activate" in the dialog
  box.

This version is now available and will be installed automatically!

:::tip

By default swupdate only contacts the OTA server every 12 hours. This is way
too long when testing new releases. You can adjust this in your Cohort settings.

Go to Fleet -> Cohorts -> default -> Settings and set "Hawkbit Polling
Interval" to "Development mode".

With this setting, the device will check for update every minute. If your device
was already running you will need to reboot it for this parameter to take effect.

:::

For more information on OTA with Memfault, please read our [OTA documentation]
[ota-doc] and the [Embedded Linux OTA Integration Guide][ota-linux-guide].

[ota-doc]: /docs/platform/ota
[ota-linux-guide]: /docs/linux/ota
[developer-mode]: /docs/linux/reference-memfaultctl-cli#developer-mode

## Next steps

To add Memfault SDK to your own Yocto distribution, read our [integration
guide][integration-guide].

[integration-guide]: /docs/linux/integration-guide
