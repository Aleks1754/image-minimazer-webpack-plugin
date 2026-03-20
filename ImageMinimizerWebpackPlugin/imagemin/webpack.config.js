import path from "node:path";
import { fileURLToPath } from "node:url";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export default (env)=> {
    return {
        mode: env.mode ?? "development",

        entry: "./src/index.js",

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].min.js',
            clean: true,
        },

        devtool: false,

        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: false
            }),
        ],

        module: {
            rules: [

                // CSS
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },

                // Images
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name].min.[ext]'
                    },
                }
            ],
        },

        devServer: {
            port: 3000,
            open: true,
        },
        optimization: {
            minimizer: [
                "...",
                new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.imageminMinify,
                        options: {
                            plugins: [
                                ["gifsicle", { interlaced: true, optimizationLevel: 3 }],
                                ["mozjpeg", { quality: 75 }],
                                ["pngquant", { quality: [0.6, 0.8] }],
                                ["svgo", { plugins: [{ name: "preset-default" }] }]
                            ],
                        },
                    }
                })
            ],
        },
    }
};
