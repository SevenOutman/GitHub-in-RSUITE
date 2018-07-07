const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const resolveToStaticPath = relativePath => path.resolve(__dirname, relativePath);

const iconPath = ['./node_modules/rsuite/styles', '../rsuite/styles'].map(resolveToStaticPath);

const { NODE_ENV, STYLE_DEBUG } = process.env;
const __PROD__ = NODE_ENV === 'production';

const extractLess = new ExtractTextPlugin('style.[hash].css');

const getStyleLoader = () => {
  const sourceMap = STYLE_DEBUG === 'SOURCE' ? '?sourceMap' : '';
  const loaders = ['css-loader', 'postcss-loader', 'less-loader?javascriptEnabled=true'];
  const filterLoader = loader =>
    STYLE_DEBUG === 'STYLE' || __PROD__ ? true : loader !== 'postcss-loader';
  return loaders.filter(filterLoader)
    .map(loader => ({
      loader: `${loader}${sourceMap}`
    }));
};

const config = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    host: '0.0.0.0',
    port: 3200,
    open: true
  },
  entry: {
    app: './src/index.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  output: {
    filename: '[name].bundle.js?[hash]',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'transform-loader?brfs', // Use browserify transforms as webpack-loader.
          'babel-loader?babelrc'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(gql|graphql)$/,
        use: [
          'graphql-tag/loader'
        ]
      },
      {
        test: /\.(less|css)$/,
        loader: extractLess.extract({
          use: getStyleLoader(),
          // use style-loader in development
          fallback: 'style-loader?{attrs:{prop: "value"}}'
        })
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        //`publicPath`  only use to assign assets path in build
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              publicPath: '/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
        include: iconPath,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              size: 16,
              hash: 'sha512',
              digest: 'hex',
              name: 'resources/[hash].[ext]',
              publicPath: '/'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        exclude: iconPath,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    extractLess,
    new webpack.NamedModulesPlugin(),
    new HtmlwebpackPlugin({
      template: 'public/index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      __PROD__: JSON.stringify(__PROD__)
    })
  ]
};

if (!__PROD__) {
  config.devServer.proxy = {
    '/api': {
      target: 'https://otv.cr-nielsen.com',
      secure: false
    }
  };
}

module.exports = config;
