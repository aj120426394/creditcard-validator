const webpack = require('webpack');
const merge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
// const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const Util = require('./Util');
const Style = require('./Style');
const Lint = require('./Lint');
const path = require('path');

module.exports = class React {
  /**
   * @constructor
   *
   * @param {String} context - The path of your source file directory.
   * @param {Object} entry - The entry point of your project. Using an Array to wrap the entry point.
   * @param {String} outputPath - The output path of the project.
   * @param {String} publicPath - The public path of the project.
   * @param {Object} alias - Alias of the webpack in your application.
   * @param {Number} devServerPort - The port number for dev server.
   * @param {String} htmlPath - The path of the html file of your project.
   * @param {boolean} localhost - Determine to use localhost or current machine's ip address
   */
  constructor({
    context,
    entry,
    outputPath,
    publicPath,
    alias,
    devServerPort = 8100,
    localhost = true,
    htmlPath = './index.html'
  }) {
    this.context = context;
    this.entry = entry;
    this.outputPath = outputPath;
    this.publicPath = publicPath;
    this.alias = alias;
    this.devServerPort = devServerPort;
    this.host = localhost ? 'localhost' : Util.getIPAddress();
    this.htmlWebpack = new HtmlWebpackPlugin({
      template: htmlPath,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    });

    this.devConfig = this.initialization('development');
    this.prodConfig = this.initialization('production');
  }

  initialization(env = 'development') {
    // const entries = JSON.parse(JSON.stringify(this.entry));
    const entries = Util.duplicateObject(this.entry);

    if (env === 'development') {
      Object.keys(entries).forEach(key => {
        entries[key].unshift('webpack/hot/only-dev-server');
        entries[key].unshift(`webpack-dev-server/client?http://${this.host}:${this.devServerPort}`);
        entries[key].unshift('react-hot-loader/patch');
      });
    }

    return {
      context: this.context,
      entry: entries,
      output: {
        path: this.outputPath,
        publicPath: env === 'development' ? `http://${this.host}:${this.devServerPort}/` : this.publicPath,
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash:8].js'
      },
      resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', '/app/vendors'],
        alias: this.alias
      },
      profile: true,
      cache: true,
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            use: [
              {
                loader: 'babel-loader'
              }
            ],
            exclude: /(node_modules|bower_components|vendors)/
          },
          {
            test: /\.jsx?$/,
            use: [
              {
                loader: 'babel-loader'
              }
            ],
            include: /(estoolbox|preact-compat)/
          },
          {
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            },
            include: /fonts?/,
            exclude: /(node_modules|bower_components|vendors)/
          },
          {
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
              name: '/assets/fonts/vendor/[name].[ext]'
            },
            include: /(node_modules|bower_components|vendors)/
          },
          {
            test: /\.htaccess/,
            loader: 'file-loader',
            options: {
              name: '[name]'
            }
          },
          {
            test: /\.(jpg|JPG|png|gif|svg)$/,
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
              limit: 8192
            },
            exclude: /(node_modules|bower_components|vendors|fonts?)/
          },
          {
            test: /\.(jpg|JPG|png|gif)$/,
            loader: 'url-loader',
            options: {
              name: '/assets/images/vendor/[name].[ext]',
              limit: 8192
            },
            include: /(node_modules|bower_components|vendors)/
          },
          {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          }
        ]
      },
      plugins: [
        this.htmlWebpack,
        // (env === 'development' ? hotModuleReplacement : null),
        new webpack.NamedModulesPlugin()
      ]
    };
  }

  /**
   * Add the style config and extract it into a independent CSS file.
   *
   * @param {Object} cssConfig - The CSS configuration with: {filter, path, extraResources}.
   */
  addExtractStyleConfig(cssConfig = {}) {
    // const devConfig = JSON.parse(JSON.stringify(cssConfig));
    const devConfig = Util.duplicateObject(cssConfig);
    devConfig['env'] = 'development';
    // const prodConfig = JSON.parse(JSON.stringify(cssConfig));
    const prodConfig = Util.duplicateObject(cssConfig);
    prodConfig['env'] = 'production';

    this.devConfig = merge(this.devConfig, Style.extractSCSStoCSS(devConfig));
    this.prodConfig = merge(this.prodConfig, Style.extractSCSStoCSS(prodConfig));
  }

  /**
   * Add the CSS module style config.
   *
   * @param {Object} cssConfig - The CSS configuration with: {filter, path, extraResources}.
   */
  addModuleStyleConfig(cssConfig = {}) {
    // const devConfig = JSON.parse(JSON.stringify(cssConfig));

    const devConfig = Object.assign({}, cssConfig);
    devConfig['env'] = 'development';
    // devConfig['env'] = 'production';
    // const prodConfig = JSON.parse(JSON.stringify(cssConfig));

    const prodConfig = Object.assign({}, cssConfig);
    prodConfig['env'] = 'production';

    this.devConfig = merge(this.devConfig, Style.SCSStoCSSModule(devConfig));
    this.prodConfig = merge(this.prodConfig, Style.SCSStoCSSModule(prodConfig));
  }

  /**
   * Add additional configuration into the setting.
   *
   * @param {Object} config - The webpack configuration format Object.
   * @param {String} env - Set 'development' if the additional configuration only be used in development environment.
   *                       Set 'production' if the additional configuration only be used in production environment.
   *                       Set '' or non-provide if the additional configuration be used in any environment.
   */
  addConfig({ config = {}, env = '' }) {
    if (env === 'development') {
      this.devConfig = merge(this.devConfig, config);
    } else if (env === 'production') {
      this.prodConfig = merge(this.prodConfig, config);
    } else {
      this.devConfig = merge(this.devConfig, config);
      this.prodConfig = merge(this.prodConfig, config);
    }
  }

  /**
   * Building the webpack configuration for production.
   *
   * @param {Array} extractLibrary - The set of library you want to extract to a separate js file.
   * @returns {*}
   */
  buildForProduction(extractLibrary = []) {
    let config = merge(
      this.prodConfig,
      Util.clean(this.outputPath),
      Util.setEnvironmentVariable({
        NODE_ENV: 'production',
        PUBLIC_URL: this.publicPath
      }),
      Util.optimize(),
      Util.AssetsManifest({
        name: 'The Griffith Graduate',
        short_name: 'the-griffith-graduate',
        background_color: '#fff',
        display: 'standalone',
        theme_color: '#535353',
        orientation: 'landscape',
        start_url: '/',
        inject: true,
        fingerprints: true
      }),
      Util.SWPrecacheWebpackPlugin(this.publicPath),
      {
        plugins: [
          new webpack.LoaderOptionsPlugin({
            minimize: true
          })
        ]
      }
    );

    if (extractLibrary.length !== 0) {
      config = merge(
        config,
        Util.extractLibBundle([
          {
            name: 'vendor',
            minChunks: ({ resource }) => resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.js$/)
          }
        ])
        // Util.extractJSBundle({
        //   name: 'vendor',
        //   entries: extractLibrary
        // })
      );
    }
    return config;
  }

  /**
   * Building webpack configuration for development
   * @returns {*}
   */
  buildForDevelopment() {
    const config = merge(
      this.prodConfig,
      Util.clean(this.outputPath),
      Util.setEnvironmentVariable({
        NODE_ENV: 'production'
      })
    );
    return config;
  }

  /**
   * Building webpack configuration for dev Server.
   * @returns {*}
   */
  buildForDevServer() {
    const config = merge(
      this.devConfig,
      {
        mode: 'development',
        devtool: 'inline-source-map',
        plugins: [
          new OpenBrowserPlugin({
            url: `http://${this.host}:${this.devServerPort}`
          })
        ],
        optimization: {
          minimize: false
        }
      },
      Util.devServer({
        host: this.host,
        port: this.devServerPort
      })
    );
    return config;
  }
};
