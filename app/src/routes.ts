import { createBrowserRouter, type RouteObject } from 'react-router';
import App from './App';
import features from './features';

const routes: RouteObject[] = [];

features.forEach(async function (feature) {
    const featureIndex: RouteObject = await import(`${feature}/index.ts`);

    routes.push(featureIndex);
});

export default createBrowserRouter([...routes]);