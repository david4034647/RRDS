import os from 'os';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
// import px2rem from 'postcss-px2rem';
import pxtorem from 'postcss-pxtorem';


console.log(`__dirname:${__dirname}`);

const srcPath = path.join(__dirname, 'app/src');
const distPath = path.join(__dirname, 'app/duxing-rrdd-react');
const mainPath = path.join(srcPath, '/main');

function getLocalIp() {
  const ifaces = os.networkInterfaces();
  for (const ifname in ifaces) {
    if (ifaces.hasOwnProperty(ifname)) {
      for (let i = 0; i < ifaces[ifname].length; i++) {
        const iface = ifaces[ifname][i];
        if (iface.family !== 'IPv4' || iface.internal !== false) {
          continue;
        }

        if (/^10\.(4|5|21)\./.test(iface.address)) {
          return iface.address;
        }
      }
    }
  }

  return 'localhost';
}

function extsToRegExp(exts) {
  const extsArr = exts.map(ext => ext.replace(/\./g, '\\.'));
  return new RegExp(`\\.(${extsArr.join('|')})$`);
}

function loadersByExtension(obj) {
  const loaders = [];
  Object.keys(obj).forEach((key) => {
    const exts = key.split('|');
    const value = obj[key];
    const entry = {
      extensions: exts,
      test: extsToRegExp(exts)
    };
    if (Array.isArray(value)) {
      entry.loaders = value;
    } else if (typeof value === 'string') {
      entry.loader = value;
    } else {
      Object.keys(value).forEach((valueKey) => {
        entry[valueKey] = value[valueKey];
      });
    }
    loaders.push(entry);
  });
  return loaders;
}

function getEntry() {
  const entry = {};
  glob.sync('**/*.js', {cwd: mainPath}).forEach((file) => {
    const name = file.substr(0, file.length - 3);
    entry[name] = path.join(srcPath, 'main', name);
  });

  return entry;
}

// function getRefactorEntry() {
//   const entry = {};
//   const pagesPath = path.join(srcPath, 'assets', 'pages');
//   glob.sync('*', {cwd: pagesPath}).forEach((dir) => {
//     glob.sync('**/*.html', {cwd: path.join(pagesPath, dir)}).forEach((html) => {
//       const name = html.substr(0, html.length - 5);
//       entry[`${dir}_${name}`] = [path.join(pagesPath, dir, `${name}.scss`)];
//       if (fs.existsSync(path.join(pagesPath, dir, `${name}.js`))) {
//         entry[`${dir}_${name}`].push(path.join(pagesPath, dir, `${name}.js`));
//       }
//     });
//   });
//
//   return entry;
// }

const titleRegExp = /\/\*+\s*title:\s*(.+?)\s*\*+\//;

function getHtmlPlugins() {
  console.log('getHtmlPlugins');
  console.log(`mainPath:${mainPath}`);
  return glob.sync('**/*.js', {cwd: mainPath}).map((file) => {
    console.log(file);
    const match = titleRegExp.exec(fs.readFileSync(path.join(mainPath, file), 'utf8'));
    const title = match ? match[1] : '人人兜兜';
    const name = file.substr(0, file.length - 3);
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: 'app/src/index.html',
      title,
      chunks: ['commons', name],
      inject: true
    });
  });
}

// function getRefactorHtmlPlugins() {
//   console.log('getRefactorHtmlPlugins');
//   const plugins = [];
//   const pagesPath = path.join(srcPath, 'assets', 'pages');
//   glob.sync('*', {cwd: pagesPath}).forEach((dir) => {
//     const p = glob.sync('**/*.html', {cwd: path.join(pagesPath, dir)}).map((html) => {
//       const name = html.substr(0, html.length - 5);
//       return new HtmlWebpackPlugin({
//         filename: `${dir}/${html}`,
//         template: path.join(pagesPath, dir, html),
//         chunks: [`${dir}_${name}`],
//         inject: true
//       });
//     });
//     plugins.push(...p);
//   });
//   return plugins;
// }

module.exports = function makeWebpackConfig(options) {
  const loaders = {
    'js|jsx': {
      loaders: options.hotComponents ? ['babel-loader?cacheDirectory'] : ['babel-loader?cacheDirectory'],
      include: srcPath
    },
    'png|jpg|jpeg|gif|svg': 'url-loader?limit=10000&name=images/[hash].[ext]',
    'woff|woff2': 'url-loader?limit=100000',
    'ttf|eot': 'file-loader',
    json: 'json-loader'
  };

  if (options.refactor) {
    loaders.html = 'html-loader';
  }

  const cssLoader = 'css-loader!postcss-loader';

  const stylesheetLoaders = {
    css: cssLoader,
    'scss|sass': [cssLoader, 'sass-loader?outputStyle=expanded']
  };
  const publicPath = options.hotComponents ? '/' : '/rrds/duxing-rrdd-react';
  // const publicPath = '/dist';
  const output = {
    path: distPath,
    publicPath,
    filename: `[name]${options.longTermCaching ? '_[chunkhash]' : ''}.js`,
    chunkFilename: `${options.devServer ? '[pid]' : '[name]'}${options.longTermCaching ? '_[chunkhash]' : ''}.js`,
    sourceMapFilename: '[file].map',
    pathinfo: options.debug
  };

  const plugins = getHtmlPlugins();

  if (options.commonsChunk) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: `commons${options.longTermCaching ? '_[chunkhash]' : ''}.js`
    }));
  }

  if (options.noErrors) {
    plugins.push(new webpack.NoErrorsPlugin());
  }

  Object.keys(stylesheetLoaders).forEach(ext => {
    let stylesheetLoader = stylesheetLoaders[ext];
    if (Array.isArray(stylesheetLoader)) {
      stylesheetLoader = stylesheetLoader.join('!');
    }
    if (options.separateStylesheet) {
      stylesheetLoaders[ext] = ExtractTextPlugin.extract('style-loader', stylesheetLoader);
    } else {
      stylesheetLoaders[ext] = `style-loader!${stylesheetLoader}`;
    }
  });
  if (options.separateStylesheet) {
    plugins.push(new ExtractTextPlugin(`[name]${options.longTermCaching ? '_[contenthash]' : ''}.css`, {
      disable: false,
      allChunks: true
    }));
  }
  if (options.minimize) {
    plugins.push(
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        },
        output: {
          comments: false
        }
      })
    );
  }

  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: options.minimize ? JSON.stringify('production') : JSON.stringify('development'),
        REMOTEDEV_HOSTNAME: options.minimize ? null : JSON.stringify(getLocalIp()),
        REMOTEDEV_PORT: options.minimize ? null : JSON.stringify(process.env.npm_package_remotedev_port)
      }
    })
  );

  return {
    entry: getEntry(),
    output,
    target: 'web',
    module: {
      loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders))
    },
    devtool: options.devtool,
    debug: options.debug,
    plugins,
    devServer: {
      contentBase: distPath,
      historyApiFallback: true,
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT || (4000)
    },
    // postcss: () => [autoprefixer, px2rem({remUnit: 75})]
    postcss: () => [autoprefixer,pxtorem({
      rootValue: 100,
      propWhiteList: []
    })]
  };
};
