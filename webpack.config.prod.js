var path = require("path");
var webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
    mode: "production",
    entry: {
        front: ["./front/index"],
        admin: ["./admin/index"],
    },
    output: {
        path: path.resolve(__dirname, "./static/dist"),
        filename: "[name].[hash].js",
        chunkFilename: "[id]-[chunkhash].js",
        publicPath: "/dist/",
    },
    plugins: [
        new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
        new webpack.optimize.AggressiveMergingPlugin(),

        new WebpackAssetsManifest({
            output: `${path.resolve(__dirname, "./static/")}/manifest.json`,
            merge: true,
            publicPath: "/dist/",
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    module: {
        noParse: [/jszip.js$/],
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot|svg)(\?[\s\S]+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ],
    },
};
