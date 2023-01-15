import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';


export default {
  entry: {
    docs: './docs2/app.js',
    components: './src2/index.js'
  },
  output: {
    filename: process.env.WEBPACK_SERVE ? '[name].js' : '[name].[contenthash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './docs2/index.html',
      chunks: ['docs']
    }),
    // new MiniCssExtractPlugin(),
    // new CompressionPlugin({
    //   exclude: ['index.html', 'theme.css']
    // }),
    new CopyPlugin({
      patterns: [
        { from: 'src2/theme.css', to: '' },
        { from: 'docs2/favicon.ico', to: '' }
      ]
    })
  ],
  devServer: {
    static: {
      directory: './docs2'
    },
    historyApiFallback: true,
    historyApiFallback: {
      rewrites: [
        { from: /bundle\.js/, to: '/docs.js' }
      ],
    },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      // {
      //   test: /^((?!theme).)*\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"]
      // },
      {
        test: /^((?!theme).)*\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.svg$/i,
        use: 'raw-loader',
      }
    ],
  }
};
