import path from "node:path";
import { fileURLToPath } from "node:url";
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

                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type:'asset',
                    use: [
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: { progressive: true, quality: 75 },
                                pngquant: { quality: [0.65, 0.9], speed: 4 },
                                gifsicle: {interlaced: false},
                                webp: { quality: 75 },
                            },
                        },
                    ],
                },
            ]
        },
        devServer: {
            port: 3000,
            open: true,
        },
    };
};