const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        'rxjs',
    ],
    output: {
        filename: 'vendors.js',
        path: path.resolve(__dirname, './root'),
        library: 'vendor_lib'
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'vendo_lib',
            path: path.resolve(__dirname, './root/vendor-manifest.json')
        })
    ]
};
