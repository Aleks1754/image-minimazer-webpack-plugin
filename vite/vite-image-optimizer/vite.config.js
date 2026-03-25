import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

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
        ViteImageOptimizer({
            logStats: true,
            ansiColors: true,
            test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
            includePublic: true,
            svg: {
                multipass: true,
                plugins: [
                    {
                        name: 'preset-default',
                        params: {
                            overrides: {
                                cleanupNumericValues: false,
                                cleanupIds: { minify: false, remove: false },
                                convertPathData: false,
                            },
                        },
                    },
                    'sortAttrs',
                    {
                        name: 'addAttributesToSVGElement',
                        params: {
                            attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                        },
                    },
                ],
            },
            png: { quality: 100 },
            jpeg: { quality: 100 },
            jpg: { quality: 100 },
            tiff: { quality: 100 },
            gif: {},
            webp: { lossless: true },
            avif: { lossless: true },
        }),
    ],
})