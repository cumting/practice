'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const glob = require('glob')

//通过glob模块来获取多页入口
exports.generateEntries = function (pathArr) {
  //这里默认的开发目录是../src/module/...
  //若要更换可通过修改正则来匹配更换
  pathArr = Array.isArray(pathArr) ? pathArr : [pathArr];
  let entries = pathArr.length && pathArr[0].endsWith('.js') ?
  {
    vue: ['Vue'],
    common: ['./src/config/bundle.js']
  } : {};
  let pathReg = pathArr.length && pathArr[0].endsWith('.js') ?
  /^\.\/src\/module\/(\S+)+\/\w+\.js$/ : 
  /^\.\/src\/module\/(\S+)+\/\w+\.html$/;
  pathArr.forEach((pathItem) => {
    glob.sync(pathItem).forEach((entry) => {
      let match = entry.match(pathReg);
      if (match) {
        entries[match[1]] = entry;
      }
    });
  });
  return entries;
}

//开发时的入口和模板(为了解决多页compile比较慢的问题，在开发的时候不会去compile所有模块)
exports.generateDevEntries = function (entryOrTemp) {
  let devEntries = {};
  entryOrTemp = entryOrTemp === 'temp' ? 'html' : 'js';
  config.dev.devDirectoryList.forEach((dirItem) => {
    let targetPath = `./src/module/${dirItem}/*.${entryOrTemp}`;
    devEntries[dirItem] = glob.sync(targetPath)[0];
  });
  return devEntries;
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
