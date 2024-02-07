const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      '/staging',
      {
        target: "http://161.35.56.41:9095/ardvest",
        changeOrigin: true,
        pathRewrite: {
          '^/staging/': '',
        },
        headers: {
          Connection: 'keep-alive',
        },
      })
  );

};