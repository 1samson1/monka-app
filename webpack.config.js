import path from 'path';

// Plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import webpack from 'webpack';


const mode = process.env.NODE_ENV
const isDev = mode === 'development'
const isProd = !isDev 

const babelOptions = preset => {
    const options = {
        presets: ['@babel/preset-env']
    }

    if(preset){
        options.presets.push(preset)
    }

    return options
}

const cssLoaders = loader => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        'css-loader'
    ]

    if(loader){
        loaders.push(loader)
    }

    return loaders
}

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if(isProd){
        config.minimize = true
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }

    return config
}

const plugins = () => {
    const base = [
        new HtmlWebpackPlugin({
            title: 'Monka',
            inject: 'body',
            template: './public/index.html'
        }),
        new CleanWebpackPlugin(),

        //Copy folder public to build folder
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: path.resolve('./public'), 
                    to: pathBuild(),
                    noErrorOnMissing: true,
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                }
            ],
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `css/${filename('.css')}`
        })
    ]

    if(isDev){
        base.push(new ESLintWebpackPlugin())
        base.push(new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(true),
        }))
    }

    if(isProd){
        base.push(new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: JSON.stringify(false),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        }))
    }

    return base;
}

const filename = ext => {
    return isDev ? `[name].${ext}` : `[name].[hash].${ext}`
}

const pathBuild = () => {
    if(isProd){
        return path.resolve('./dist')
    }
    
    return path.resolve('./build')
}

// Webpack config
export default  (env, args) => {

    return {
        mode: mode,
        entry: {
            monka: ['@babel/polyfill', './src/index.js']
        },
        output: {
            filename: `js/${filename('.js')}`,
            path: pathBuild()
        },
        resolve: {
            alias: {
                "@": path.resolve('./src'),
            }
        },
        devServer:{
            hot: true,
            port: 4777,
        },
        optimization: optimization(),
        plugins: plugins(),
        module: {
            rules: [
                // Babel loader
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: babelOptions()
                    }
                },
                
                // Vue loader
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },

                // Css loaders
                {
                    test: /\.css$/,
                    use: cssLoaders()
                },

                // File loaders
                {
                    test: /\.(png|gif|jpg|jpeg)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: `img/${filename('[ext]')}`
                    }
                },
                {
                    test:  /\.(ttf|svg|woff|woff2|eot)$/,
                    type: 'asset/inline',
                }
            ]    
        }
    }
}
