import express from 'express';
import webpack from 'webpack';

import config from './webpack.config.babel';

const publicPath = config.output && config.output.publicPath;

const app = express();
const compiler = webpack(config);

app.listen(8080, '0.0.0.0');
