const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);

const babelLoaderConfiguration = {
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            presets: ['@babel/preset-react'],
            plugins: ['react-native-web']
        }
    }
};

module.exports = {
    mode: 'development',
    entry: [
        path.resolve(appDirectory, 'index.web.js')
    ],
    output: {
        filename: 'bundle.web.js',
        path: path.resolve(appDirectory, 'dist')
    },

    module: {
        rules: [
        babelLoaderConfiguration,
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ]
    },

    // plugins:[new HtmlWebpackPlugin({ template: './public/index.html'})],
    plugins: [
        new HtmlWebpackPlugin({template: path.resolve(appDirectory, 'public', 'index.html')})
    ],

    resolve: {
        alias: {
        'react-native$': 'react-native-web'
        },
        extensions: [ '.web.js', '.js' ]
    }
}