require('dotenv').config();
const express = require('express');
const features = require('./features');

const app = express();

const urlPrefix = process.env.URL_PREFIX ?? '';

features.forEach(function(feature) {
    const _feature = require(`./features/${feature}/main`);

    if (Object.hasOwn(_feature, 'middlewares')) {
        middlewares = _feature.middlewares;

        middlewares.forEach(function(middleware) {
            const _middleware
                = require(`./features/${feature}/${middlewares}`);

            app.use(middleware);
        });
    }

    if (
        Object.hasOwn(_feature, 'urlPrefix')
        && Object.hasOwn(_feature, 'routes')
    ) {
        const moduleUrlPrefix = _feature.urlPrefix;
        const routes = _feature.routes;

        console.log(`${urlPrefix}${moduleUrlPrefix}`)

        app.use(`${urlPrefix}${moduleUrlPrefix}`, routes);
    }
});

const port = process.env.PORT ?? 4000;

app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});