module.exports = function (config) {
  // This is the default webpack config defined in the `../webpack.config.js`
  // modify as you need.

  const PATHS = {
    fonts: '../../../node_modules/font-awesome/fonts'
  };

  const fontAwesomeLoaders = [
    // the url-loader uses DataUrls.
    {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    },
    {
      test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
      // loader: "url?limit=10000"
      loader: "url"
    },
    {
      test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
      loader: 'file'
    },
  ];

  config.module.loaders = config.module.loaders.concat(fontAwesomeLoaders);
  return config;
};
