// const withSass = require('@zeit/next-sass');
//
// module.exports = withSass();


module.exports = {
  reactStrictMode: true,
  experimental: {css: true},
  images: {
    domains: ['www.frc.org','frc.org','frcaction.org','www.frcaction.org','www.frcblog.com']
  }
}
