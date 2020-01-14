---
id: reboot-reason-tracking
title: Reboot Reason Tracking
sidebar_label: Reboot Reason Tracking
---

There's many reasons a device may reboot in the field — whether it be due to a
crash, a brown out, or a firmware update. The
[reboot tracking](https://github.com/memfault/memfault-firmware-sdk/blob/master/components/panics/include/memfault/panics/reboot_tracking.h#L9-L21)
module within the SDK allows one to easily do this. Here are the steps to get
started:

### 1. Allocate RAM storage for reboot tracking (64 bytes)

Note that as long as power is not lost, RAM state will remain valid across an
MCU reset. For a power loss, the reboot tracking module will automatically
detect this and re-initialize itself. All you need to do is make sure the RAM
region is not initialized as part of your systems power on firmware sequence.
For GNU GCC, this can easily be achieved by placing the memory in a section that
is not part of `.bss` or `.data`:

```c
#include "memfault/panics/reboot_tracking.h"

static uint8_t s_reboot_tracking[MEMFAULT_REBOOT_TRACKING_REGION_SIZE]
    __attribute__((section(".mflt_reboot_info")));
```

```ld
/* Your .ld file */

MEMORY
{
  /* [...] */
  NOINIT (rw) :  ORIGIN = <RAM_REGION_START>, LENGTH = 64
}
SECTIONS
{
  /* [...] */
  .noinit (NOLOAD): { KEEP(*(*.mflt_reboot_info)) } > NOINIT
}
```

### 2. Initialize reboot tracking module

Nearly all MCUs have a register you can read on boot to understand why the
device reset. For example, on the NRF52 it's `RESETREAS`, on stm32 parts it's
`RCC_RSR` or `RCC_CSR`, on NXP parts it's `AOREG1`. When you initialize the
reboot tracking subsystem, the value in this register can be appended to the
prior reset information. If there's no register information to collect, you can
also simply pass `NULL` as an argument.

```c
#include "memfault/panics/reboot_tracking.h"
// [...]
int main(void) {
  // [...]
  // Example of reset reason for nrf52
  const sResetBootupInfo reset_reason = {
     .reset_reason_reg = NRF_POWER->RESETREAS,
  };
  memfault_reboot_tracking_boot(s_reboot_tracking, &reset_reason);
}
```

### 3. Initialize event storage

All events generated in the Memfault SDK are stored and transmitted using a
compressed format (**CBOR**). As they await to be sent, they are stored in the
"event storage" core component. For reboot reasons, you need to hold one
serialized event (~60 bytes). The exact size needed can be determined with
`memfault_reboot_tracking_compute_worst_case_storage_size()`

```c
#include "memfault/core/event_storage.h"
// [...]
int main(void) {
   // [... other initialization code ...]
   static uint8_t s_event_storage[100];
   const sMemfaultEventStorageImpl *evt_storage =
      memfault_events_storage_boot(s_event_storage, sizeof(s_event_storage));
}
```

### 4. Save previous reset information in event storage

Once you've initialized the reboot reason module & setup event storage, you can
collect any prior reset information and prepare it for transmission

```c
#include "memfault/core/event_storage.h"
// [...]
int main(void) {
  // [... other initialization code ...]
  memfault_reboot_tracking_collect_reset_info(evt_storage);
}
```

### 5. Publish reset information to the Memfault cloud

Extensive details about how data from the Memfault SDK makes it to the cloud can
be found [here](data-from-firmware-to-cloud.md). In short, all data is published
via the same "chunk" REST
[endpoint](https://api-docs.memfault.com/?version=latest#66b0e390-2c3e-4c0d-b6c2-836a287b9e5f).

```c
#include "memfault/core/data_packetizer.h"
// [...]

bool try_send_memfault_data(void) {
    // buffer to copy chunk data into
    uint8_t buf[USER_CHUNK_SIZE];
    size_t buf_len = sizeof(buf);

    bool data_available = memfault_packetizer_get_chunk(buf, &buf_len);
    if (!data_available ) {
      return false; // no more data to send
    }

    // send payload collected to chunks/ endpoint
    user_transport_send_chunk_data(buf, buf_len);
    return true;
}

void send_memfault_data(void) {
  // [... user specific logic deciding when & how much data to send
  while (try_send_memfault_data()) { }
}
```

### 6. Add custom reset tracing for your application

The Memfault **panics** component will automatically generate traces any time a
fault handler is invoked or anytime your system calls `MEMFAULT_ASSERT_RECORD`,
`MEMFAULT_ASSERT`, `memfault_fault_handling_assert`. If you'd like to add reset
tracking in other places, this can easily be achieved with the
`memfault_reboot_tracking_mark_reset_imminent` API. For example, consider we
want to track anytime a reset occurs due to an OTA:

```c
#include "memfault/core/compiler.h"
#include "memfault/panics/reboot_tracking.h"

// [...]

void ota_finalize_and_reboot(void) {
  // The pc & lr which result in the reboot can always be *optionally* recorded
  void *pc;
  MEMFAULT_GET_PC(pc);
  void *lr = MEMFAULT_GET_LR();
  sMfltRebootTrackingRegInfo reg_info = {
    .pc = (uint32_t)pc,
    .lr = (uint32_t)lr,
  };
  // Note: "reg_info" may be NULL if no register information collection is desired
  memfault_reboot_tracking_mark_reset_imminent(kMfltRebootReason_FirmwareUpdate,
                                               &reg_info);
  // [... logic to reboot the MCU ...]
}
```
