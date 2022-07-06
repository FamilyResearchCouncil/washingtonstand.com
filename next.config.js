const childProcess = require('child_process')

module.exports = {
  reactStrictMode: true,
  experimental: {
    css: true
  },
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['www.frc.org','frc.org','frcaction.org','www.frcaction.org','www.frcblog.com']
  },
  generateBuildId: async () => {
    // let buildId = await childProcess.exec('git rev-parse HEAD', function(err, stdout) {
    //   return stdout;
    // });
    return require('child_process')
        .execSync('git rev-parse HEAD')
        .toString().trim();
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}
