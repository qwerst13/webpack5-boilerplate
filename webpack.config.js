const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = (process.env.NODE_ENV === 'production') ? 'production' : 'development';

module.exports = {
  mode,

  entry: {
      main: path.resolve(__dirname, './src/js/index.js'),
  },

  output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].bundle.js',
  },

  devtool: "source-map",

  module:{
    rules: [
      // Babel
      {
        test: /\.js$/i,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader', 
        options: {
          presets: ['@babel/preset-env'],
        }
      },

      // SCSS -> CSS
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader, // Extract css to separate file
          'css-loader', // translates CSS into CommonJS
          'postcss-loader', // parse CSS and add vendor prefixes to CSS rules
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },

      // fonts from css
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]'
        }
      },

      // Pictures from css
      {
        test: /\.(svg|png|jpg|jpeg|webp)$/i,
        loader: 'file-loader',
        options: {
          name: './static/[name].[ext]'
        }
      }
    ]
  },

  plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        title: 'App',
        template: './src/index.html',
        favicon: "src/favicon.ico"
      }),
      new CopyWebpackPlugin({
          patterns: [
              {
                  from: path.resolve(__dirname, 'src/img'),
                  to:   path.resolve(__dirname, 'dist/img')
              }
          ]
      }),
  ],

  devServer: {
      contentBase: path.join(__dirname, 'dist'),
      open: true,
      port: 8080,
  }
}
