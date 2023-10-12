/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useIsBrowser from "@docusaurus/core/lib/client/exports/useIsBrowser";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";
import classNames from "classnames";
import {
    AiFillAndroid,
    BiBluetooth,
    BiChip,
    FiCode,
    FiExternalLink,
    FiFileText,
    FiPlayCircle,
    FiTerminal,
    VscTerminalLinux,
} from "react-icons/all";

function MemfaultLogoImg(props) {
    const { colorMode } = useColorMode();
    // https://github.com/facebook/docusaurus/issues/2646
    // This is a hack to refresh the src after server-side rendering.
    const isBrowser = useIsBrowser();
    const src =
        colorMode === "dark"
            ? `img/memfault-logo-full-dark-min.png`
            : "img/memfault-logo-full-light-min.png";
    return (
        <img key={String(isBrowser)} src={src} alt="Memfault logo" {...props} />
    );
}

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="Description will go into a meta tag in <head />"
        >
            <main className={styles["content"]}>
                <header
                    className={classNames(
                        styles["hero-content"],
                        styles["hero-text"],
                    )}
                >
                    <a href="https://memfault.com" title="memfault.com">
                        <MemfaultLogoImg className={styles["hero-logo"]} />
                    </a>
                    <p>
                        Ship hardware products at the speed of software. With
                        Memfault, you can continuously monitor devices, debug
                        firmware issues, and deploy OTA updates to your fleet.
                    </p>
                    <a
                        className={styles["hero-link"]}
                        href="/docs/platform/introduction"
                    >
                        Feature Overview <FiExternalLink />
                    </a>
                </header>
                <hr className={styles["divider"]} />
                <div className={styles["resources"]}>
                    <div className={styles["resources-column"]}>
                        <div>
                            <h2>Documentation</h2>
                            <p>Getting Started</p>
                            <ul className={styles["links"]}>
                                <li>
                                    <a href="/docs/mcu/introduction">
                                        <BiChip />
                                        MCU Integration Guide
                                    </a>
                                </li>
                                <li>
                                    <a href="/docs/android/introduction">
                                        <AiFillAndroid />
                                        Android Integration Guide
                                    </a>
                                </li>
                                <li>
                                    <a href="/docs/linux/introduction">
                                        <VscTerminalLinux />
                                        Linux Integration Guide
                                    </a>
                                </li>
                                <li>
                                    <a href="https://api-docs.memfault.com/">
                                        <FiExternalLink />
                                        REST API Reference
                                    </a>
                                </li>
                            </ul>
                            <p>Tools</p>
                            <ul className={styles["links"]}>
                                <li>
                                    <a href="/docs/ci/install-memfault-cli">
                                        <FiTerminal />
                                        Memfault CLI
                                    </a>
                                </li>
                                <li>
                                    <a href="/docs/mcu/da1469x-sdk-guide/#post-data-to-cloud-via-web-bluetooth">
                                        <BiBluetooth />
                                        Memfault WebBluetooth Bridge
                                    </a>
                                </li>
                            </ul>
                            <p>Get the Code</p>
                            <ul className={styles["links"]}>
                                <li>
                                    <a href="https://github.com/memfault/memfault-firmware-sdk">
                                        <FiCode />
                                        MCU SDK
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/memfault/bort">
                                        <FiCode />
                                        Android Bort SDK
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/memfault/memfault-linux-sdk">
                                        <FiCode />
                                        Linux SDK
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.nordicsemi.com/bundle/ncs-2.4.2/page/nrf/samples/debug/memfault/README.html">
                                        <FiCode />
                                        Memfault Module in the nRF Connect SDK
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/memfault/particle-firmware-library">
                                        <FiCode />
                                        Memfault SDK for Particle
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/memfault/memfault-ios-cloud">
                                        <FiCode />
                                        Memfault Bridge SDK for iOS
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/memfault/memfault-cloud-android">
                                        <FiCode />
                                        Memfault Bridge SDK for Android
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles["resources-column"]}>
                        <h3>Videos</h3>
                        <ul className={styles["links"]}>
                            <li>
                                <a href="https://vimeo.com/476494176">
                                    <FiPlayCircle />
                                    Quick Introduction to Memfault (2:16)
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/watch?v=ge-ebleCi8o">
                                    <FiPlayCircle />
                                    Getting Started with Memfault for MCUs
                                    (50:46)
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/watch?v=B_dlThWJ7X0">
                                    <FiPlayCircle />
                                    Managing Android Devices At Scale (58:54)
                                </a>
                            </li>
                        </ul>
                        <h3>Learning Resources</h3>
                        <p>
                            The Interrupt Community was created and is moderated
                            today by the founders of Memfault.
                            <a href="https://interrupt.memfault.com/">
                                Read the Interrupt Blog <FiExternalLink />
                            </a>
                        </p>
                        <p>
                            Memfault frequently holds webinars on embedded
                            development and makes them available on demand.
                            <a href="https://memfault.com/webinars/">
                                Watch Webinars on Demand <FiExternalLink />
                            </a>
                        </p>
                        <h3>Community</h3>
                        <p>
                            Discuss the content of our webinars and ask any
                            question related to Memfault.
                            <a href="https://community.memfault.com/">
                                Join the Community Forum <FiExternalLink />
                            </a>
                        </p>
                        <p>
                            Comment on Interrupt blog posts and meet a thriving
                            community of engineers, hobbyists and enthusiasts.
                            <a href="https://interrupt-slack.herokuapp.com/">
                                Join the Interrupt Slack Group{" "}
                                <FiExternalLink />
                            </a>
                        </p>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default Home;
