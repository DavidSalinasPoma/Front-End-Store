

const path = require('path');

// Inyección de archivo js a html con plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Extrae el archivo css del bundle
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Para minimizar el css para produccion
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js',
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].[chunkhash].js",
    },

    // Personalizar el tamaño de la app
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },

    // mode: 'development',
    devtool: 'source-map',
    devServer: {
        // contentBase: path.join(__dirname, './src'), // Busca el archivo index html
        // compress: true,
        port: 9000,
        // publicPath: './public/js',
        // watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                            esModule: false
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                // ,"image-webpack-loader"  Activar solamente para pasar a Produccion..
                use: [
                    {
                        loader: 'file-loader',
                        loader: 'url-loader',
                        options: {
                            name: "[name].[hash].[ext]",
                            outputPath: "assets/",
                            // publicPath: 'assets',
                        }
                    },
                    {
                        // Minificando imagenes // ,"image-webpack-loader"  Activar solamente para pasar a Produccion..
                        loader: 'image-webpack-loader',
                    }
                ]
            },
            {
                test: /\.js$/, // Busca todos los archivos js de nuestro proyecto
                exclude: /(node_modules|public)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            // title: "Webpack Por DavidSalinas",
            template: "./src/index.html",
            filename: "./index.html",
            chunks: ["app"],
            hash: true,
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            // title: "Webpack Por DavidSalinas",
            template: "./src/nosotros.html",
            filename: "./nosotros.html",
            chunks: ["app"],
            hash: true,
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            // title: "Webpack Por DavidSalinas",
            template: "./src/productos.html",
            filename: "./productos.html",
            chunks: ["app"],
            hash: true,
            inject: "body"
        }),

        //  Nuevo Plugin
        new MiniCssExtractPlugin({
            filename: "styles/css/[name]-styles.css",

        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
};