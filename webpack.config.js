var NODE_ENV = process.env.NODE_ENV || "development";
var webpack = require('webpack');
module.exports = {
    entry: './client/index.js',
    output: {
        filename: 'bundle.js',
        path: './public/build'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0', 'react'], //ES6,ES7,REACT
                }
            }
        ]
    },
    plugins: NODE_ENV == "development" ? [] :
        [
            new webpack.optimize.UglifyJsPlugin({
                compress: {warnings: false}
            })
        ],
    watch: NODE_ENV == "development",
    devtool: NODE_ENV == "development" ? 'eval-cheap-module-source-map' : false
};