import redirectIfNotLoggedIn from "@/middlewares/redirectIfNotLoggedIn";
import Dashboard from "./Dashboard";

export default [
    {
        path: '/dashboard',
        Component: Dashboard,
        middleware: [redirectIfNotLoggedIn]
    },
];