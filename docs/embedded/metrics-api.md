---
id: metrics-api
title: Metrics API
sidebar_label: Metrics API
---

## Overview

- There's many system health vitals that are useful to track aside from crashes
  and reboots. The options are numerous but you can expand the toggle to get a
  few examples.
  - RTOS related statistics
    - Amount of time spent in each RTOS task per unit time. This can help you
      understand if one task is starving the system
    - Heap high water marks
    - Stack high water marks
  - Time MCU was in different states
    - Stop, Sleep, Run Mode
    - Time each peripherals were active
  - Battery life drop per unit time.
  - Transport specific metrics (LTE, WiFI, BLE, LoRa, etc)
    - Amount of time transport was connected
    - Amount of connection attempts
    - Number of bytes being over transport per unit time.
- In the Memfault UI, you can configure [Alerts](/platform/alerts.md) based on
  these metrics as well as explore metrics collected for any device. You can
  expand the toggle to see an example tracking the time bluetooth was connected,
  the amount of bytes sent, and the battery life.

  ![Metrics](/img/docs/embedded/metrics-api.png)

The Memfault SDK includes a "metrics" component that makes it easy to collect
this type on information on an embedded device. In the sections below we will
walk through how to integrate the component and get started using it!

## Integration Steps

### 1. Create "memfault_metrics_heartbeat_config.def" and define a metric

In this file you will define all the metrics you would like to track using the
`MEMFAULT_METRICS_KEY_DEFINE` macro. In this guide we will walk through a simple
example of tracking the high water mark of the stack for a "Main Task" in our
application and the number of bytes sent out over a bluetooth connection.

```c
// File $ROOT/config/memfault_metrics_heartbeat_config.def
MEMFAULT_METRICS_KEY_DEFINE(MainTaskStackHwm, kMemfaultMetricType_Unsigned)
MEMFAULT_METRICS_KEY_DEFINE(BtBytesSent, kMemfaultMetricType_Unsigned)
```

You will also need to make sure the file is in your`include` path list:

```makefile
# [ ... other parts of build system ... ]
CFLAGS += -I$(ROOT_DIR)/config/
```

### 2. Initialize event storage

All events generated in the Memfault SDK are stored and transmitted using a
compressed format (**[CBOR](https://en.wikipedia.org/wiki/CBOR)**). As they
await to be sent from the Memfault data packetizer, they are stored in the
"event storage" core component which can be initialized as follows:

```c
#include "memfault/core/event_storage.h"
// [...]
int main(void) {
   // [... other initialization code ...]
   // NOTE: memfault_metrics_heartbeat_compute_worst_case_storage_size()
   // can be used to determine max storage size needed for one event
   static uint8_t s_event_storage[100];
   const sMemfaultEventStorageImpl *evt_storage =
      memfault_events_storage_boot(s_event_storage, sizeof(s_event_storage));
}
```

### 3. Implement metrics timer platform dependency

The metrics subsystem requires one "timer" to control when data is aggregated
into a "heartbeat". When the heartbeat subsystem is booted, a dependency
function `memfault_platform_metrics_timer_boot` will be called to set up this
timer. Most RTOSs have a software timer implementation that can be directly
mapped to the API or a hardware timer can be used as well. The expectation is
that `callback` will be invoked every `period_sec` (which by default is once /
hour).

```c
#include "memfault/metrics/platform/timer.h"
// [...]
bool memfault_platform_metrics_timer_boot(uint32_t period_sec,
                                          MemfaultPlatformTimerCallback callback) {
  // [... platform specific code to setup timer ...]
  return true; // indicates setup was successful
}
```

### 4. Implement time since boot platform dependency

The heartbeat metrics subsystem supports a timer type
(`kMemfaultMetricType_Timer`) which can be used to easily track durations (i.e.
time spent in MCU stop mode) as well as overall system uptime. To support this,
the `memfault_platform_get_time_since_boot_ms()`. Typically this information is
derived from either a system's Real Time Clock (RTC) or the SysTick counter used
by an RTOS.

```c
#include "memfault/core/platform/core.h"
// [...]
uint64_t memfault_platform_get_time_since_boot_ms(void) {
  // TODO: Compute current time since boot in milliseconds and return
  // the result
}
```

### 5. Initialize Heartbeat Module

To start the metrics subsystem, you just need to call the
`memfault_metrics_boot` API when the system restarts and pass it the
`evt_storage` context we set up in step 2. After this call a heartbeat will be
serialized to event storage at the rate specified (default is once / hour).

```c
#include "memfault/metrics/metrics.h"
// [...]
int memfault_subsystem_boot(void) {
   [...]
   int rv = memfault_metrics_boot(evt_storage);
   // NOTE: a non-zero value indicates a configuration error took place
   YOUR_PLATFORMS_ASSERT_MACRO(rv != 0);
}
```

### 6. Start setting metric values

There's a set of APIs in `memfault/metrics/metrics.h` which can be used to
easily update heartbeats as events take place. The updates occur in RAM so there
is negligible overhead introduced. Here's an example:

```c
#include "memfault/metrics/metrics.h"
// [ ... ]
void bluetooth_driver_send_bytes(const void *data, size_t data_len) {
  memfault_metrics_heartbeat_add(MEMFAULT_METRICS_KEY(BtBytesSent), data_len);
  // [ ... code to send bluetooth data ... ]
}
```

### 7. [Optional] Implement `memfault_metrics_heartbeat_collect_data`

`memfault_metrics_heartbeat_collect_data` will always be called at the very
beginning of heartbeat serialization. By default this is a weak empty function
but you will want to implement it if there's data you want to put in the
heartbeat stored in other parts of the system. The `MainTaskStackHwm` we are
tracking is a good example for why we would want to implement this:

```c
#include "memfault/core/platform/overrides.h"
// [...]
void memfault_metrics_heartbeat_collect_data(void) {
  // NOTE: When using FreeRTOS we can just call
  // "uxTaskGetStackHighWaterMark(s_main_task_tcb)"
  const uint32_t stack_high_water_mark = // TODO: code to get high water mark
  memfault_metrics_heartbeat_set_unsigned(
      MEMFAULT_METRICS_KEY(MainTaskStackHwm), stack_high_water_mark);
}
```

### 8. Publish heartbeat information to the Memfault cloud

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

### 9. [Optional] Initial Setup & Debug APIs

While integrating the heartbeat metrics subsystem or adding new metrics, there
are a few easy ways you can debug and test the new code. Notably:

- `memfault_metrics_heartbeat_debug_trigger` can be called at any time to
  trigger a heartbeat serialization (so you don't have to wait for the entire
  interval to get data to flush)
- `memfault_metrics_heartbeat_debug_print` can be called to dump the current
  value of all the metrics being tracked
