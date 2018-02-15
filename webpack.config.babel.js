import path from 'path';
import webpack from 'webpack';
import jsonImporter from 'node-sass-json-importer';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Directories
const PATH_ROOT = path.resolve(__dirname);
const PATH_SRC = path.resolve(PATH_ROOT, 'src');
const PATH_DIST = path.resolve(PATH_ROOT, 'dist');

// Regex
const REG_JS = /\.js$/;
const REG_JSON = /\.json$/;
const REG_CSS = /\.s?css$/;

const webpackConfig = {
  entry: path.join(PATH_SRC, 'index.js'),

  output: {
    path: PATH_DIST,
    filename: '[name]-[hash].js',
    publicPath: '/',
  },

  module: {
    rules: [
      // JS
      {
        test: REG_JS,
        include: PATH_SRC,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

      // JSON
      {
        test: REG_JSON,
        include: PATH_SRC,
        exclude: /node_modules/,
        loader: 'url-loader',
      },

      // SCSS
      {
        test: REG_CSS,
        include: PATH_SRC,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              importer: jsonImporter,
            },
          },
        ],
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.json', '.scss'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATH_SRC, 'index.html'),
    }),
  ],
};

export default webpackConfig;