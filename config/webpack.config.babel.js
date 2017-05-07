import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const PATHS = {
  app: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build'),
}

const commonConfig = {
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:8080',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    // the entry point of our app
    PATHS.app,
  ],
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React.js Boilerplate',
      filename: path.join(PATHS.build, 'index.html'),
      template: path.join(PATHS.app, 'index.html'),
    }),
  ],
  resolve: {
    modules: [
      path.join(__dirname, '../src'),
      path.join(__dirname, '../node_modules'),
    ],
  },
}

const productionConfig = () => {
  const config = {
    entry: PATHS.app,
  }

  return Object.assign(
    {},
    commonConfig,
    config,
  )
}

const developmentConfig = () => {
  const config = {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Don't refresh if hot loading fails. If you want
      // refresh behavior, set hot: true instead.
      hot: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Docker, Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: process.env.HOST, // Defaults to `localhost`
      port: process.env.PORT, // Defaults to 8080

      // Enable error/warning overlay
      overlay: {
        errors: true,
        warnings: true,
      },

      proxy: {
        '/': {
          target: 'http://localhost:3000',
        },
      },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
  }

  return Object.assign(
    {},
    commonConfig,
    config,
    {
      plugins: commonConfig.plugins.concat(config.plugins),
    }
  )
}

export default (env) => {
  if (env === 'production') return productionConfig()
  return developmentConfig()
}
