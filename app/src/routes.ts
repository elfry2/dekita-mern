import { createBrowserRouter, redirect, type RouteObject } from 'react-router';
import authentication from './features/authentication/main';

// import deasync from 'deasync';
// import features from './features';

// const routes: RouteObject[] = [];

// features.forEach(deasync(async function (feature) {
//     const featureIndex: RouteObject = await import(`./features/${feature}/main.ts`);

//     routes.push(featureIndex);
// }));

// for (const feature of features) {
//     const featureIndex: RouteObject = await import(`./features/${feature}/main.ts`);

//     routes.push(featureIndex);
// }

const routes: RouteObject[] = [
    {
        path: '/',
        loader: function() {
            throw redirect('/login');
        },
    },
    ...authentication,
];

export default createBrowserRouter([...routes]);;