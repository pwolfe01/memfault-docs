/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const math = require("remark-math");
const katex = require("rehype-katex");

module.exports = {
    title: "Memfault Docs",
    tagline: "Learn how to say goodbye to firmware bugs",
    url: "https://docs.memfault.com",
    baseUrl: "/",
    favicon: "img/memfault-favicon.png",
    organizationName: "memfault",
    onBrokenMarkdownLinks: "throw",
    projectName: "memfault-firmware-sdk", // Usually your repo name.
    themeConfig: {
        algolia: {
            appId: "4SXF6GYFKZ",
            apiKey: "2028276a4fc7f09eeb0bd082fbd85164",
            indexName: "memfault",
        },
        prism: {
            theme: require("prism-react-renderer/themes/oceanicNext"),
            additionalLanguages: ["linker-script"],
        },
        navbar: {
            title: "Memfault Docs",
            logo: {
                alt: "Memfault Logo",
                src: "img/memfault-logo.svg",
            },
            items: [
                {
                    to: "docs/platform/introduction",
                    activeBasePath: "docs/platform",
                    label: "Web App",
                    position: "left",
                },
                {
                    to: "docs/mcu/introduction",
                    activeBasePath: "docs/mcu",
                    label: "MCU",
                    position: "left",
                },
                {
                    to: "docs/linux/introduction",
                    activeBasePath: "docs/linux",
                    label: "Linux",
                    position: "left",
                },
                {
                    to: "docs/android/introduction",
                    activeBasePath: "docs/android",
                    label: "Android",
                    position: "left",
                },
                /* Uncomment for built-in API docs
                 * { to: "api", label: "Cloud API", position: "left" },
                 */
                {
                    to: "https://api-docs.memfault.com",
                    label: "API",
                    position: "left",
                    target: "_blank",
                    rel: "noopener",
                },
                { to: "changelog", label: "Changelog", position: "left" },
                {
                    to: "https://app.memfault.com/",
                    target: "_blank",
                    rel: "noopener",
                    label: "Log In",
                    position: "right",
                },
                {
                    to: "https://memfault.com/register?utm_campaign=Self%20Serve%20Launch&utm_source=Docs",
                    target: "_blank",
                    rel: "noopener",
                    label: "Sign Up",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Memfault",
                    items: [
                        {
                            label: "Sign Up",
                            href: "https://memfault.com/register?utm_campaign=Self%20Serve%20Launch&utm_source=Docs",
                        },
                        {
                            label: "Log In",
                            href: "https://app.memfault.com",
                        },
                        {
                            label: "Memfault Home",
                            href: "https://memfault.com/",
                        },
                    ],
                },
                {
                    title: "Source Code",
                    items: [
                        {
                            label: "Firmware SDK",
                            href: "https://github.com/memfault/memfault-firmware-sdk",
                        },
                        {
                            label: "Android Bort SDK",
                            href: "https://github.com/memfault/bort",
                        },
                    ],
                },

                {
                    title: "Community",
                    items: [
                        {
                            label: "Interrupt Blog",
                            href: "https://interrupt.memfault.com/blog",
                        },
                        {
                            label: "Slack Group",
                            href: "https://interrupt-slack.herokuapp.com/",
                        },
                        {
                            label: "Forums",
                            href: "https://community.memfault.com/",
                        },
                    ],
                },
                {
                    title: "Connect",
                    items: [
                        {
                            label: "Contact Us",
                            href: "https://memfault.com/contact/",
                        },
                        {
                            label: "LinkedIn",
                            href: "https://www.linkedin.com/company/memfault/",
                        },
                        {
                            label: "Twitter",
                            href: "https://twitter.com/Memfault",
                        },
                        {
                            label: "YouTube",
                            href: "https://www.youtube.com/channel/UCGHAOw3JpB6zOnwA27dlYcQ",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Memfault, Inc. Docs built with Docusaurus.`,
        },
    },
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl:
                        "https://github.com/memfault/memfault-docs/edit/main/",
                    remarkPlugins: [math],
                    rehypePlugins: [katex],
                },
                gtag: {
                    trackingID: "G-R5JYJ06TDJ",
                    anonymizeIP: true,
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
                blog: {
                    blogTitle: "Memfault Changelog",
                    blogDescription:
                        "The latest changes to the Memfault product and service",
                    blogSidebarCount: 10,
                    showReadingTime: false,
                    routeBasePath: "changelog",
                },
            },
        ],
    ],
    stylesheets: [
        {
            href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
            type: "text/css",
            integrity:
                "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
            crossorigin: "anonymous",
        },
    ],
    scripts: [
        {
            src: "https://js.hs-scripts.com/8551838.js",
            async: true,
        },
    ],
    plugins: [
        [
            "@docusaurus/plugin-content-blog",
            {
                id: "embed-android",
                routeBasePath: "embed/android",
                path: "./embed/android",
            },
        ],
        [
            "@docusaurus/plugin-content-blog",
            {
                id: "embed-mcu",
                routeBasePath: "embed/mcu",
                path: "./embed/mcu",
            },
        ],
        [
            "@docusaurus/plugin-content-blog",
            {
                id: "embed-linux",
                routeBasePath: "embed/linux",
                path: "./embed/linux",
            },
        ],
        [
            "@docusaurus/plugin-ideal-image",
            {
                /* implied widths: 320, 640, 960, 1280, 1600, 1920 */
                min: 320,
                max: 1920,
                steps: 6,
                quality: 70,
                disableInDev: false,
            },
        ],
    ],
};
