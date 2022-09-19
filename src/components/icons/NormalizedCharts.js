import React from "react";

const IconLightUrl = "/components/icons/icon-normalized-charts-light-64x64.gif";
const IconDarkUrl = "/components/icons/icon-normalized-charts-dark-64x64.gif";

import { useColorMode } from "@docusaurus/theme-common";

export default function NormalizedCharts() {
    const { isDarkTheme } = useColorMode();
    const iconUrl = isDarkTheme ? IconDarkUrl : IconLightUrl;
    return (
        <img
            src={iconUrl}
            style={{ width: "1em", height: "1em" }}
            alt="Icon to Toggle Chart Normalization "
        />
    );
}
