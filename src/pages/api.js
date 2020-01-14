import React from "react";
import Layout from "@theme/Layout";
import { RedocStandalone } from "redoc";

function Hello() {
    return (
        <Layout title="API Reference">
            <RedocStandalone specUrl="/swagger/memfault-api.json" />
        </Layout>
    );
}
export default Hello;
