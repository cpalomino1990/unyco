const path = require('path');

module.exports = {
    entry: './src/widget.js',
    output: {
        filename: 'widget.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'MyWidget',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    mode: 'production'
};