import React, { useEffect, useState } from "react";
import { Redirect } from "@docusaurus/router";
import routes from "@generated/routes";

const DOCS_ROOT = "/docs";

export default function RandomPage({ subRoute = "/docs" }) {
    // default needed to prevent infinite loop of re-mounting
    const [randomRoute, setRandomRoute] = useState("/");

    const selectedRoutes = routes
        .filter((route) => {
            return route.path === DOCS_ROOT;
        })
        .flatMap((route) => {
            if (route.routes) {
                return route.routes;
            }

            return route;
        })
        // filter a second time because some routes are nested under the "/docs" route
        .filter((route) => {
            return route.path === subRoute || route.path.startsWith(subRoute);
        })
        .map((route) => route.path);

    useEffect(() => {
        setRandomRoute(
            selectedRoutes[Math.floor(Math.random() * selectedRoutes.length)],
        );
    }, []);
    return <Redirect to={randomRoute} />;
}
