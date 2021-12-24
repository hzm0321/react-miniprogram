const path = require('path');

module.exports = {
  watch: true,
  mode: 'production',
  entry: './pages/index/index.js',
  output: {
    path: path.resolve(__dirname, 'mini/pages/index'),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
      }
    ]
  }
};
