import { createBrowserRouter, type RouteObject } from 'react-router';
import home from './features/home/main';
import authentication from './features/authentication/main';
import dashboard from './features/dashboard/main';

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
    ...home,
    ...authentication,
    ...dashboard,
];

export default createBrowserRouter(routes);