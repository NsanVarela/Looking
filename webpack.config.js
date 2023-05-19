const path = require('path')

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'client/public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images',
                        },
                    },
                ],
            },
        ]
    },
    devServer: {
        static: path.join(__dirname, 'client/public'),
        port: 3001,
        hot: true,
    }
};
