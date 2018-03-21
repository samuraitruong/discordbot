var path = require('path');
 var webpack = require('webpack');
 const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
 const nodeExternals = require('webpack-node-externals');
 module.exports = {
     entry: './src/index.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'bot.js'
     },
     plugins: [
        //new UglifyJsPlugin()
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
      ],
     module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ["@babel/preset-env", {
                            "targets": {
                              "node": "6.10"
                            }
                          }]

                    ]
                }
              }
            }
          ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map',
     target: 'node',
     externals: [nodeExternals()],
 };