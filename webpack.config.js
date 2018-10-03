const merge = require('webpack-merge');
const path = require('path');
// const Base = require('./webpack/Base');
const Util = require('./webpack/Util');
const Style = require('./webpack/Style');
const Lint = require('./webpack/Lint');
const React = require('./webpack/React');

/**
 * The context of your application.
 * Point this to your source directory.
 * @type {String}
 */
const CONTEXT = path.join(__dirname, 'app');

/**
 * The port number use on webpack-dev-server.
 * @type {number}
 */
const DEV_SERVER_PORT = 8100;

/**
 * Entry point of your application.
 * Point this to your entry js file or you can have multiple entry point.
 * @type {{ENTRY_NAME: String[]}}
 */
const ENTRY = {
  app: ['./index.jsx']
};

/**
 * Output file path.
 * Point to your output directory.
 * @type {String}
 */
const OUTPUT_PATH = path.join(__dirname, 'dist');

/**
 * Public path of your application.
 * Point to your full website URL.
 * @type {String}
 */
const PUBLIC_PATH = 'https://app-dev.devsecure.griffith.edu.au/jeff/the-griffith-graduate/';

/**
 * Alias of the webpack in your application.
 * Point to the module that you would like to have a short name.
 * @type {{SHORT_NAME: String}}
 */
const ALIAS = {
};

/**
 * Extra scss resources you want the webpack to recognize during the bundling.
 * Point to the directories that contain the extra scss file.
 * @type {String[]}
 */
const EXTRA_SCSS_RESOURCES = [
  path.resolve(__dirname, 'node_modules/compass-mixins/lib'),
  path.resolve(__dirname, 'app/vendors/materialize/sass')
];

/**
 * Sass resource which will be read in every css module. Only required when you are using CSS module.
 * Point to the scss file you would like to be read.
 * @type {String[]}
 */
const SASS_RESOURCES = [path.resolve(__dirname, 'app/scss/app.scss')];





const baseConfig = new React({
  context: CONTEXT,
  entry: ENTRY,
  outputPath: OUTPUT_PATH,
  publicPath: PUBLIC_PATH,
  alias: ALIAS,
  localhost: false,
  devServerPort: DEV_SERVER_PORT,
  htmlPath: './index.html'
});

baseConfig.addModuleStyleConfig({
  filter: 'exclude',
  path: [/(node_modules)/, path.resolve(__dirname, 'app/scss/vendors'), path.resolve(__dirname, 'app-react/vendors')],
  sassResource: SASS_RESOURCES
});

baseConfig.addExtractStyleConfig({
  fileName: 'vender',
  filter: 'include',
  path: [/(node_modules)/, path.resolve(__dirname, 'app/scss/vendors'), path.resolve(__dirname, 'app-react/vendors')],
  extraResources:EXTRA_SCSS_RESOURCES
});
//
// const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin;
//
// baseConfig.addConfig({
//   config: {
//     plugins: [
//       new CriticalPlugin({
//         src: 'index.html',
//         base: path.resolve(__dirname, 'dist'),
//         inline: true,
//         minify: true,
//         dest: 'test.html'
//       })
//     ]
//   }
// });

// /**
//  * Basic webpack configuration for your application.
//  * @param {String} env - 'development' or 'production'
//  * @returns {{}} - configuration of the webpack
//  */
// const base = function (env) {
//   const style = new Style();
//   return (
//     merge(
//       initialization(env,),
//       style.extractSCSStoCSS({
//         env,
//         filter: 'include',
//         path: [/(node_modules|bower_components|vendors)/, path.resolve(__dirname, "app/scss/vendors"), path.resolve(__dirname, "app/vendors")],
//         extraResources: EXTRA_SCSS_RESOURCES
//       })
//       // style.SCSStoCSSModule(
//       //   env,
//       //   'exclude',
//       //   [/node_modules/, path.resolve(__dirname, "app/scss/vendors"), path.resolve(__dirname, "app/vendors")],
//       //   [],
//       //   SASS_RESOURCES
//       // )
//     )
//   );
// };

let exportConfig;
switch (process.env.npm_lifecycle_event) {
  case 'build':
    exportConfig = baseConfig.buildForProduction(['react', 'react-dom', 'react-router', 'react-router-dom']);
    break;
  case 'dev':
    exportConfig = baseConfig.buildForDevelopment();
    break;
  default:
    exportConfig = baseConfig.buildForDevServer();
}

module.exports = exportConfig;
