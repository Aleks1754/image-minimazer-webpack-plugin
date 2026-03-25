import { defineConfig } from 'vite'
import viteImagemin from 'vite-plugin-imagemin'


export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
            },
            output: {
                entryFileNames: '[name].min.js',
                assetFileNames: 'images/[name][hash][extname]',
            },
        },
        assetsInlineLimit: 0,
    },
    server: {
        port: 3000,
    },
    plugins: [
        viteImagemin({
            gifsicle: {
                optimizationLevel: 3,
                interlaced: false,
            },
            optipng: {
                optimizationLevel: 0,
            },
            pngquant: {
                quality: [1, 1],
                speed: 1,
            },
            mozjpeg: {
                quality: 100,
            },
            webp: {
                lossless: true,
            },
            avif: {
                lossless: true,
            },
            svgo: {
                multipass: true,
                plugins: [
                    {
                        name: 'preset-default',
                        params: {
                            overrides: {
                                cleanupNumericValues: false,
                                cleanupIDs: { remove: false, minify: false },
                                convertPathData: false,
                            },
                        },
                    },
                    'sortAttrs',
                    {
                        name: 'addAttributesToSVGElement',
                        params: { attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }] },
                    },
                ],
            },
        }),
    ],
})