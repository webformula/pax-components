import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';



export default {
  entry: {
    docs: './docs/app.js',
    components: './src/index.js'
  },
  output: {
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './docs/index.html',
      chunks: ['docs']
    }),
    // new MiniCssExtractPlugin(),
    new CompressionPlugin({
      exclude: ['index.html', 'theme.css']
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/theme.css', to: '' }
      ]
    })
  ],
  devServer: {
    static: {
      directory: './docs'
    },
    historyApiFallback: true,
    historyApiFallback: {
      rewrites: [
        { from: /bundle\.js/, to: '/bundle.js' },
      ],
    },
  },
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
