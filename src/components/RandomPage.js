import React, { useEffect, useState } from "react";
import { Redirect } from "@docusaurus/router";
import routes from "@generated/routes";

export default function RandomPage() {
    const [randomRoute, setRandomRoute] = useState("/");
    const selectedRoutes = routes
        .filter((route) => {
            return route.path === "/docs" || route.path.startsWith("/docs/");
        })
        .flatMap((route) => {
            if (route.routes) {
                return route.routes;
            }

            return route;
        })
        .map((route) => route.path);

    useEffect(() => {
        setRandomRoute(
            selectedRoutes[Math.floor(Math.random() * selectedRoutes.length)],
        );
    }, []);
    return <Redirect to={randomRoute} />;
}
