module.exports = {
  entry: "./lib/entry.js",
  output: {
  	filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/], // Specifies file types to transpile
        exclude: /(node_modules)/, // Leaves dependencies alone
        loader: 'babel', // Sets Babel as the transpiler
        query: {
          presets: ['es2015'] // Tells Babel what syntaxes to translate
        }
      }
    ]
  },
};
