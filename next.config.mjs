/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: ["styles"],
    prependData: `@import "src/styles/_variables.scss"; @import "src/styles/_mixin.scss"; @import "src/styles/_fonts.scss";`, // prependData 옵션 추가
  },
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.ap-northeast-2.amazonaws.com", // s3 주소 바꾸기
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
