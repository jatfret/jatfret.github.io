var path = require('path');
var webpack = require('webpack');
module.exports = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080',
		path.resolve(__dirname, 'app/main.js')
	],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel?presets[]=es2015'],
			exclude: /node_modules/
		}]
	},
	plugins: [
    	new webpack.HotModuleReplacementPlugin()
    ],
	devServer: {
	    noInfo: true,
	    hot: true,
	    inline: true
    }
};
