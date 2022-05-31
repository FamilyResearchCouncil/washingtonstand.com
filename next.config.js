// const withSass = require('@zeit/next-sass');
//
// module.exports = withSass();


module.exports = {
  reactStrictMode: true,
  experimental: {
    css: true,
    styledComponents: true
  },
  images: {
    domains: ['www.frc.org','frc.org','frcaction.org','www.frcaction.org','www.frcblog.com']
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}
