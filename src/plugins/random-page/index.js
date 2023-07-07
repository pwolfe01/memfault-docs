module.exports = async function randomPage(context, options) {
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

        async postBuild(props) {},
    };
};
