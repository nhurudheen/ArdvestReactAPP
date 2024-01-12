const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      '/staging',
      {
        target: "http://localhost:9095/ardvest",
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