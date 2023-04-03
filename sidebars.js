/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
    docs: [
        {
            type: "category",
            label: "Web Application",
            items: [
                "platform/introduction",
                "platform/memfault-terminology",
                "platform/projects-and-fleets",
                "platform/inspecting-a-device",
                "platform/software-version-hardware-version",
                "platform/user-management",
                "platform/access-control-teams-roles",
                "platform/organization-auth-tokens",
                "platform/issue-management",
                "platform/ota",
                "platform/metrics",
                "platform/charts",
                "platform/alerts",
                "platform/notifications",
                "platform/fleet-sampling",
                "platform/rate-limiting",
                "platform/sso",
                "platform/jira-integration",
                /* "platform/bulk-device-upload", */
                {
                    label: "Reference",
                    type: "category",
                    link: {
                        type: "doc",
                        id: "platform/reference-reboot-reason-ids",
                    },
                    items: ["platform/reference-reboot-reason-ids"],
                },
            ],
        },
        {
            type: "category",
            label: "MCU Guides",
            items: [
                "mcu/introduction",
                {
                    type: "category",
                    link: { type: "generated-index" },
                    label: "Getting Started Guides",
                    items: [
                        "mcu/arm-cortex-m-guide",
                        "mcu/nrf-connect-sdk-guide",
                        "mcu/pinnacle-100-guide",
                        "mcu/esp32-guide",
                        "mcu/esp8266-rtos-sdk-guide",
                        "mcu/da1469x-sdk-guide",
                        "mcu/arm-nxp-mcuxpresso-guide",
                        "mcu/zephyr-guide",
                        "mcu/arm-infineon-modustoolbox-guide",
                    ],
                },
                {
                    type: "category",
                    link: { type: "generated-index" },
                    label: "Subsystem Guides",
                    items: [
                        "mcu/coredumps",
                        "mcu/compact-logs",
                        "mcu/custom-data-recording",
                        "mcu/event-timestamps",
                        "mcu/reboot-reason-tracking",
                        "mcu/metrics-api",
                        "mcu/trace-events",
                        "mcu/logging",
                        "mcu/releases-integration-guide",
                        "mcu/symbol-file-build-ids",
                        "mcu/heap-stats",
                        "mcu/rtos-analysis",
                    ],
                },
                {
                    type: "category",
                    link: { type: "generated-index" },
                    label: "User Guides",
                    items: [
                        "mcu/coredump-elf-with-gdb",
                        "mcu/uploading-data-with-mqtt",
                        "mcu/sdk-submodule",
                        "mcu/watchdogs",
                    ],
                },
                {
                    type: "category",
                    link: { type: "generated-index" },
                    label: "Design Docs",
                    items: [
                        "mcu/data-from-firmware-to-the-cloud",
                        "mcu/event-serialization-overview",
                    ],
                },
                {
                    type: "category",
                    link: { type: "generated-index" },
                    label: "Test Utilities",
                    items: [
                        "mcu/test-patterns-for-chunks-endpoint",
                        "mcu/test-data-collection-with-gdb",
                        "mcu/export-chunks-over-console",
                        "mcu/demo-cli",
                    ],
                },
            ],
        },
        {
            label: "Android Guides",
            type: "category",
            items: [
                "android/introduction",
                "android/android-getting-started-guide",
                "android/android-bort",
                "android/uploading-android-diagnostics",
                "android/uploading-android-symbol-files",
                "android/android-reboot-events",
                "android/custom-events",
                "android/android-logging",
                "android/android-builtin-metrics",
                "android/android-custom-metrics",
                "android/android-releases-integration-guide",
                "android/android-ota-update-client",
                "android/android-data-scrubbing",
                "android/android-multi-device-support",
            ],
        },
        {
            label: "Linux Guides",
            type: "category",
            items: [
                "linux/introduction",
                "linux/quickstart",
                "linux/quickstart-raspberrypi",
                "linux/integration-guide",
                {
                    type: "category",
                    link: {
                        type: "generated-index",
                        slug: "linux/subsystem-guides",
                    },
                    label: "Subsystem Guides",
                    items: [
                        "linux/ota",
                        "linux/metrics",
                        "linux/coredumps",
                        "linux/reboot-reason-tracking",
                        "linux/logging",
                    ],
                },
                {
                    label: "Reference",
                    type: "category",
                    link: {
                        type: "doc",
                        id: "linux/reference-memfaultd-configuration",
                    },
                    items: [
                        "linux/reference-memfaultd-configuration",
                        "linux/reference-memfaultctl-cli",
                    ],
                },
                "linux/memfault-hawkbit-comparison",
            ],
        },
        {
            label: "Automation, CI & CD",
            type: "category",
            link: { type: "generated-index" },
            items: [
                "ci/authentication",
                "ci/install-memfault-cli",
                "ci/add-device-to-cohort-api",
            ],
        },
        {
            label: "Best Practices",
            type: "category",
            link: { type: "generated-index" },
            items: [
                "best-practices/metrics-for-battery-life",
                "best-practices/fleet-reliability-metrics-crash-free-hours",
                "best-practices/low-bandwidth-devices",
            ],
        },
        {
            label: "Troubleshooting",
            type: "category",
            link: {
                type: "doc",
                id: "troubleshooting/uploading-symbol-file-is-invalid",
            },
            items: [
                "troubleshooting/uploading-symbol-file-is-invalid",
                "troubleshooting/data-transfer-troubleshooting",
            ],
        },
    ],
};
