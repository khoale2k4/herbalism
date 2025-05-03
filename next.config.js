const { hostname } = require("os");

module.exports = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/uploads/**',
            },
        ],
        domains: ['sufficient-chrystal-khoale2k4-c17296fe.koyeb.app', 'merian-alchemie.ub.uni-frankfurt.de'],
    },
}