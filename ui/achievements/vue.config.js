// vue.config.js
module.exports = {
    // options...
    runtimeCompiler: true,
    publicPath: process.env.NODE_ENV === 'production'
    ? '/ui/penduino-1.0/'
    : '/'
  }
  