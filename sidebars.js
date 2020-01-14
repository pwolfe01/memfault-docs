/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
    docs: {
        Platform: [
            "platform/memfault-terminology",
            "platform/software-version-hardware-version",
            "platform/alerts",
            /* Draft: "platform/releasing-firmware", */
        ],
        "Bare Metal & RTOS": [
            "embedded/uploading-software-versions",
            "embedded/data-from-firmware-to-the-cloud",
            "embedded/reboot-reason-tracking",
            "embedded/metrics-api",
            "embedded/test-patterns-for-chunks-endpoint",
            "embedded/arm-mdk-guide",
        ],
        Android: ["android/uploading-android-bugreports"],
        "CI / CD": [
            "ci/add-device-to-cohort-api",
            "ci/uploading-artifacts-api",
        ],
        Troubleshooting: ["troubleshooting/uploading-symbol-file-is-invalid"],
    },
};
