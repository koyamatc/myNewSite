var path = require('path');

module.exports = {
	// Application entry point
	entry: './lists_forms_.js',
	output:{
		// ﾌｧｲﾙの出力先
		path: __dirname,
		
		// output file name
		filename :'lists_forms.js'
	},
	module: {
		loaders: [
			{
				test: /\.(css)$/,
				// 複数のローダーを"!"で接続できる
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.js$/,
				exclude:/node_modules/,
				loader: 'babel-loader',
				query: {
          			presets: ['react', 'es2015']
        		}
			}
		]
	},
};