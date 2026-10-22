import { redirect } from "react-router";

export default [
    {
        path: '/',
        loader: function () {
            throw redirect('/dashboard');
        },
    },
];