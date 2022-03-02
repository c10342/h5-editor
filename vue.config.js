module.exports = {
  devServer: {
    open: true,
    proxy: {
      "/api": {
        target: "https://api.imooc-lego.com",
        changeOrigin: true,
      },
    },
  },
};
