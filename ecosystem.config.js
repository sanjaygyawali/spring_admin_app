module.exports = {
  script: "serve",
  env: {
    PM2_SERVE_PATH: ".",
    PM2_SERVE_PORT: 5001,
    PM2_SERVE_SPA: "true",
    PM2_SERVE_HOMEPAGE: "./dist/spa/index.html"
  }
};
