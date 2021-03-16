---
id: bulk-device-upload
title: Bulk Device Upload
sidebar_label: Bulk Device Upload
---

Large numbers of devices can be added to your memfault fleet and assigned to cohorts at once via CSV upload. This guide will cover how to bulk-upload devices.

## Create a CSV File with device information and cohort assignments

The first thing to do is to create a CSV file (comma-separated values) with the following columns:

1. device_serial
   - The serial number of the device
2. hardware_version
   - The hardware version of the device (eg: EVT, DVT, PVT etc). Since hardware companies typically have many revisions of their product through stages of manufacturing, this field can be used to surface hardware-level differences. Note: With Memfault OTA Updates, different hardware versions can receive different software artifacts if needed, all as part of the same release.
3. cohort
   - The cohort you want to assign this device to. Populating this field is **optional**. Devices that have this field blank will be assigned to the **default** cohort.

Note: Repeated rows for same device will be ignored. Only the first occurrence will be taken into account.

## Upload the CSV File to Memfault

1. In your Memfault account on the browser, navigate to **Fleet** &rightarrow; **Devices**.
2. In the right hand corner, click on **Device CSV upload**
3. Upload your CSV File.

<p align="center">
  <img width="500" src="/img/docs/platform/bulk-device-upload.gif" alt="Uploading your CSV via the Memfault UI" />
</p>

At this point, you should see your device information populated in the **Fleet** &rightarrow; **Devices** view.
