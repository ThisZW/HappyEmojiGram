const path = require('path');
const entryFile = path.resolve(__dirname, 'client', 'src', 'index.js');
const outputDir = path.resolve(__dirname, 'public');

module.exports = {
    entry: ['@babel/polyfill', entryFile],
    output: {
        filename: 'bundle.js',
        path: outputDir
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }],

            },
            {
                test: /\.less$/,
                loader: 'less-loader' // compiles Less to CSS
            },
            {
                test: /\.(scss|css)$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src'],
                        minimize: true
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|jpeg|ttf|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',

                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase: "./public",
        hot: true,
        port: 3000,
        historyApiFallback: true
    }
};