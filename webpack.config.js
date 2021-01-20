const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const devServerConfig = require('./config/webpack.server.config')

module.exports = {
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            react: path.join(__dirname, 'node_modules', 'react'),
        },
        // Nie wiem, czy mogę zmieniać tutaj coś w konfiguracji, ale przy zmianie App.js -> App.jsx webpack mi szalał
        // https://stackoverflow.com/questions/34678314/webpack-cant-find-module-if-file-named-jsx
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ],
    },
    devServer: devServerConfig,
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
        }),
    ],
};