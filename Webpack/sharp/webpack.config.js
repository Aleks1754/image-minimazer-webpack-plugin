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
                    use: [
                        "style-loader",
                        "css-loader"
                    ],
                },

                // PNG/JPG/JPEG/GIF/WebP
                {
                    test: /\.(jpe?g|png|gif|webp|svg)$/i,
                    type: "asset/resource",
                    generator: { filename: "images/[name][ext]" }
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
                                    // JPEG
                                    jpeg: {
                                        lossless: true,
                                        quality: 100,
                                        progressive: true,
                                        chromaSubsampling: "4:4:4",
                                        trellisQuantisation: true,
                                        overshootDeringing: true,
                                        optimiseCoding: true,
                                        quantisationTable: 3,
                                        mozjpeg: true,
                                    },

                                    // PNG
                                    png: {
                                        lossless: true,
                                        compressionLevel: 9,
                                        adaptiveFiltering: true,
                                        palette: true,
                                        quality: 100,
                                        effort: 7,
                                        colors: 256,
                                        dither: 1.0,
                                    },

                                    // GIF
                                    gif: {
                                        reuse: true,
                                        progressive: false,
                                        colours: 256,
                                        effort: 7,
                                        dither: 1.0,
                                        interFrameMaxError: 0,
                                        interPaletteMaxError: 0,
                                        keepDuplicateFrames: false,
                                        loop: 0,
                                        delay: null,
                                    },

                                    // WebP
                                    webp: {
                                        lossless: true,
                                        quality: 100,
                                        alphaQuality: 100,
                                        nearLossless: true,
                                        smartSubsample: true,
                                        preset: "photo",
                                        effort: 6,
                                        loop: 0,
                                        delay: null,
                                    },
                                },
                            },
                        },
                        {
                            implementation: ImageMinimizerPlugin.svgoMinify,
                            options: {
                                encodeOptions: {
                                    multipass: true,
                                    plugins: [
                                        "preset-default"
                                    ],
                                },
                            },
                        },
                    ],
                }),
            ],
        },
    };
};