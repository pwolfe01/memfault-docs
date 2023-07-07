module.exports = async function randomPage(context, options) {
    let routes = [];

    return {
        name: "random-page",

        async loadContent() {},

        async contentLoaded({ content, actions }) {
            const { addRoute } = actions;

            addRoute({
                path: "/random",
                component: "@site/src/components/RandomPage.js",
                modules: {},
                exact: true,
            });
        },

        async postBuild(props) {
            props.routesPaths.map((route) => {
                if (
                    !(route.startsWith("/docs/") || route.startsWith("/embed/"))
                ) {
                    return;
                }

                routes.push(route);
            });
            console.log(routes);
        },
    };
};
