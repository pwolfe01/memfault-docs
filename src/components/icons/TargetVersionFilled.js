import React from "react";

import { useColorMode } from "@docusaurus/theme-common";

export default function TargetVersionFilled() {
    const { isDarkTheme } = useColorMode();
    const color = isDarkTheme ? "#fff" : "#000";
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 64 64"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            class=""
        >
            <circle
                cx="32"
                cy="32"
                r="29.5"
                stroke={color}
                fill="transparent"
                stroke-width="5"
            ></circle>
            <circle cx="32" cy="32" r="17" fill={color}></circle>
        </svg>
    );
}
