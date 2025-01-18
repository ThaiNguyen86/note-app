import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    return (
        <div id='error' className="text-center">
            <h1 className="font-bold text-3xl">Error Page</h1>
            <p className="font-semibold" >Sorry, an error occurred.</p>
            <p><i>{error.statusText || error.message} !</i></p>
        </div>
    )
}