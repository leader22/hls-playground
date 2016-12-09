module.exports = {
  context: `${__dirname}/src`,
  entry: {
    hls: './main.js',
  },

  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
};
