import React from "react";

/** Bring your own leading slash. */
export const PROJECT_MAGIC_URL =
    "https://app.memfault.com/organizations/-/projects/-";

/** Bring your own leading slash. */
export function ProjectMagicLink({ path, children, ...anchorProps }) {
    return (
        <a
            title="Link to your Project on the Memfault Web App."
            href={`${PROJECT_MAGIC_URL}${path}`}
            {...anchorProps}
        >
            {children}
        </a>
    );
}
