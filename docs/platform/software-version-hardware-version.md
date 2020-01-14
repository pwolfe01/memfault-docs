---
id: software-version-hardware-version
title: Software Version & Hardware Version
sidebar_label: Software Version & Hardware Version
---

## Hardware Version

The "Hardware Version" is used to identify the type of hardware which software
is running on. A given device will always map to exactly one "Hardware Version".
It can be used to differentiate different device types being tracked in the same
project (i.e `smart-toaster` and `smart-oven`) and different board revisions of
the same device type (i.e `smart-toaster-evt`, `smart-toaster-pvt`, etc)

## Software Type

The "Software Type" is used to identify the separate pieces of software running
on a given device. This can be images running on different MCUs (i.e
`main-mcu-app` & `bluetooth-mcu`) or different images running on the same MCU
(i.e `main-mcu-bootloader` & `main-mcu-app`). You can also use "Software Type"
to distinguish between build variants (i.e. `main-mcu-dvt` & `main-mcu-evt`).

The software running on your devices will need to report its Software Type
correctly such that it matches with what has been configured in the Project.
Please see the
[core/device info component](https://github.com/memfault/memfault-firmware-sdk/blob/master/components/core/README.md)
of the Firmware SDK for details on how to set this up on the device's software
side.

## Software Version

A Software Version is a single release for a particular Software Type. A single
Software Version is associated with one Symbol Software Artifact (.elf file).

    ├── main-fw     # Software Type
    │   ├── 1.0.0   # Software Version
    │   ├── 1.1.0
    │   ├── 1.1.1
    |   ...
    └── wifi-fw
        ├── 11.0
        ├── 12.0
        ├── 12.1
        ...

The software running on your devices will need to report its Software Version
correctly such that it matches with what has been configured in the Project.
Please see the
[core/device info component](https://github.com/memfault/memfault-firmware-sdk/blob/master/components/core/README.md)
of the Firmware SDK for details on how to set this up on the device's software
side.
