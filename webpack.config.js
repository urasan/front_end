module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: __dirname + '/dest',
    filename: 'content_script/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
