import React from 'react';
import { Redirect } from '@docusaurus/router';
import routes from '@generated/routes';

export default function RandomPage() {
    const selectedRoutes = routes.filter((route) => {
        return route.path === '/docs' || route.path.startsWith('/docs/');
    }).flatMap((route) => {
        if (route.routes) {
            return route.routes;
        }

        return route;
    }).map((route) => route.path);
    const randomRoute = selectedRoutes[Math.floor(Math.random() * selectedRoutes.length)];
    console.log(selectedRoutes);
    console.log(randomRoute);
    return <Redirect to={randomRoute} />;
}
