const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 16,
            propList: ["*"],
          }),
        ],
      },
    },
  },
  lintOnSave: false, // 忽略es-lint
  productionSourceMap: false, // 过滤map文件
  assetsDir: "static",
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 生产环境去除console.log
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      let plugins = [new BundleAnalyzerPlugin()];
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"));
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) =>
        Object.assign(options, {
          limit: 10240, // 小于10k，转成base64，减少http请求
          name: `[name].[hash:8].[ext]`,
        })
      );
  }
}
