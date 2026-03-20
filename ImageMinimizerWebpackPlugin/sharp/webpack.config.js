import path from "node:path";
import { fileURLToPath } from "node:url";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {

    return {
        mode: env.mode ?? "development",
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].min.js",
            clean: true,
            assetModuleFilename: "images/[name].min.[ext]",
        },
        devtool: false,
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: false,
            }),
        ],
        module: {
            rules: [
                // CSS
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },

                // PNG/JPG/JPEG/GIF/WebP
                {
                    test: /\.(jpe?g|png|gif|webp)$/i,
                    type: "asset",
                },

                // SVG
                {
                    test: /\.svg$/i,
                    type: "asset",
                    generator: {
                        filename: "images/[name].min.[ext]",
                    },
                },
            ],
        },
        devServer: {
            port: 3000,
            open: true,
        },
        optimization: {
            minimizer: [
                new ImageMinimizerPlugin({
                    minimizer: [
                        {
                            implementation: ImageMinimizerPlugin.sharpMinify,
                            options: {
                                encodeOptions: {
                                    // https://sharp.pixelplumbing.com/api-output#jpeg
                                    jpeg: {
                                        quality: 70,                 // output quality (1-100), lower = smaller size
                                        progressive: true,           // use progressive/interlaced JPEG for faster perceived load
                                        chromaSubsampling: "4:4:4",  // prevent color subsampling to keep full color detail
                                        optimiseCoding: true,        // optimize Huffman coding tables
                                        trellisQuantisation: true,   // apply trellis quantisation for better compression
                                        overshootDeringing: true,    // reduce ringing artifacts around edges
                                        optimiseScans: true,         // optimize progressive scans
                                        quantisationTable: 3,        // use quantization table 3 (default balanced)
                                        mozjpeg: true,               // use mozjpeg defaults for better compression efficiency
                                        force: true,                 // always output as JPEG
                                    },


                                    // https://sharp.pixelplumbing.com/api-output#webp
                                    webp: {
                                        quality: 60,                 // output quality (1-100), lower = smaller file size
                                        alphaQuality: 80,            // quality of alpha/transparency layer (0-100)
                                        lossless: false,             // use lossy compression for smaller files; true = lossless
                                        nearLossless: true,          // use near-lossless mode for high quality with some compression
                                        smartSubsample: true,        // high-quality chroma subsampling
                                        smartDeblock: true,          // auto-adjust deblocking filter for smoother edges (slower)
                                        preset: "photo",             // preprocessing preset: photo, picture, drawing, icon, text
                                        effort: 4,                   // CPU effort: 0 = fastest, 6 = slowest
                                        loop: 0,                      // number of animation iterations, 0 = infinite loop
                                        delay: null,                 // keep original frame delays; number or array in ms
                                        minSize: false,              // do not attempt extra optimization via keyframes (slower)
                                        mixed: false,                // do not mix lossy and lossless frames
                                        force: true                  // always output as WebP
                                    },

                                    // PNG by default sets the quality to 100%, which is same as lossless
                                    // https://sharp.pixelplumbing.com/api-output#png
                                    png: {
                                        compressionLevel: 6,       // zlib compression level (0 = fastest, largest; 9 = slowest, smallest)
                                        adaptiveFiltering: true,   // use adaptive row filtering to reduce file size without losing quality
                                        palette: true,             // use a palette (reduces colors for smaller file size)
                                        quality: 70,               // target quality (percentage of original colors)
                                        effort: 7,                 // CPU effort for compression (1 = fastest, 10 = slowest)
                                        colors: 256,               // maximum number of palette entries
                                        dither: 1.0,               // level of Floyd-Steinberg error diffusion for smoother gradients
                                        force: true,               // always output as PNG, even if input format differs
                                    },

                                    // GIF does not support lossless compression at all
                                    // https://sharp.pixelplumbing.com/api-output#gif
                                    gif: {
                                        reuse: true,                   // re-use existing palette for faster processing; false generates a new palette (slower)
                                        progressive: false,            // do not use interlaced GIF; rarely needed
                                        colours: 64,                  // maximum number of palette entries including transparency (2–256)
                                        effort: 7,                     // CPU effort: 1 = fastest, 10 = slowest
                                        dither: 1.0,                   // level of Floyd-Steinberg error diffusion for smoother gradients (0–1)
                                        interFrameMaxError: 0,         // maximum inter-frame error for transparency (0 = lossless)
                                        interPaletteMaxError: 3,       // maximum error when reusing palette between frames
                                        keepDuplicateFrames: false,    // remove duplicate frames to reduce file size
                                        loop: 0,                        // number of animation iterations, 0 = infinite loop
                                        delay: null,                   // keep original frame delays; can be number or array in ms
                                        force: true                    // always output as GIF
                                    }
                                },
                            },
                        },
                        {
                            implementation: ImageMinimizerPlugin.svgoMinify,
                            options: {
                                encodeOptions: {
                                    // Pass over SVGs multiple times to ensure all optimizations are applied (False by default)
                                    multipass: true,
                                    plugins: [
                                        // Built-in plugin preset enabled by default
                                        // See: https://github.com/svg/svgo#default-preset
                                        "preset-default",
                                    ],
                                },
                            }
                        }]
                }),
            ],
        },
    };
};