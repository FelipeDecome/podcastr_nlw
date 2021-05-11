/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const withPlugins = require('next-compose-plugins');
const reactSvg = require('next-react-svg');

const nextConfig = {
    images: {
        domains: ['cdn-images-1.listennotes.com']
    }
};

module.exports = withPlugins(
    [
        [
            reactSvg,
            {
                include: path.resolve(__dirname, 'src', 'assets', 'icons'),
                webpack(config) {
                    return config;
                }
            }
        ]
    ],
    nextConfig
);
