module.exports = async function randomPage(context, options) {
    return {
        name: "random-page",

        async loadContent() {},

        async contentLoaded({ content, actions }) {
            const { addRoute, createData } = actions;

            addRoute({
                path: "/random",
                component: "@site/src/components/RandomPage.js",
                modules: {},
                exact: true,
            });

            const mcuSubRoute = "/docs/mcu";
            const mcuSubRouteJsonPath = await createData(
                "mcuSubRoute.json",
                JSON.stringify(mcuSubRoute),
            );
            addRoute({
                path: "/random/mcu",
                component: "@site/src/components/RandomPage.js",
                modules: {
                    subRoute: mcuSubRouteJsonPath,
                },
                exact: true,
            });

            const linuxSubRoute = "/docs/linux";
            const linuxSubRouteJsonPath = await createData(
                "linuxSubRoute.json",
                JSON.stringify(linuxSubRoute),
            );
            addRoute({
                path: "/random/linux",
                component: "@site/src/components/RandomPage.js",
                modules: {
                    subRoute: linuxSubRouteJsonPath,
                },
                exact: true,
            });

            const androidSubRoute = "/docs/android";
            const androidSubRouteJsonPath = await createData(
                "androidSubRoute.json",
                JSON.stringify(androidSubRoute),
            );
            addRoute({
                path: "/random/android",
                component: "@site/src/components/RandomPage.js",
                modules: {
                    subRoute: androidSubRouteJsonPath,
                },
                exact: true,
            });
        },

        async postBuild(props) {},
    };
};
