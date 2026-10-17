require('dotenv').config();
const express = require('express');
const features = require('./features');
const dns = require('dns');
const mongoose = require('mongoose');
const cors = require('cors');

dns.setServers(['1.1.1.1', '8.8.4.4']);

mongoose.connect(process.env.MONGODB_URI)
    .then(function () {
        const app = express();

        const urlPrefix = process.env.URL_PREFIX ?? '';

        app.use(cors());
        app.use(express.json());

        features.forEach(function (feature) {
            const _feature = require(`./features/${feature}/main`);

            if (Object.hasOwn(_feature, 'middlewares')) {
                middlewares = _feature.middlewares;

                middlewares.forEach(function (middleware) {
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

                app.use(`${urlPrefix}${moduleUrlPrefix}`, routes);
            }
        });

        const port = process.env.PORT ?? 4000;

        app.listen(port, function () {
            console.log(`Server is running on port ${port}`);
        });
    });