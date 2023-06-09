import express from "express";
import webpack from "webpack";
import React from "react";
import webpackConfig from "../webpack.config.dev";
const app = express();
const compiler = webpack(webpackConfig);
app.use(
    require("webpack-dev-middleware")(compiler, {
        publicPath: webpackConfig.output.publicPath,
    })
);

app.use(require("webpack-hot-middleware")(compiler));
app.listen(8022, function (err) {
    if (err) {
        return;
    }
    console.log("app started ...");
});
