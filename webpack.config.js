const path = require( "path" );
const TerserPlugin = require( "terser-webpack-plugin" );

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.join( __dirname, 'docs/src/js/' ),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    devServer: {
        open: true,
        openPage: './index.html',
        contentBase: path.join( __dirname, 'docs' ),
        publicPath: '/src/js/', // defaultのpath指定"/"になっているから、buildの階層が深い時はこのoptionを指定する。
        watchContentBase: true,
        port: 3000,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin( {
                terserOptions: {
                    ecma: undefined,
                    parse: {},
                    compress: {},
                    mangle: true,
                    module: false,
                    output: null,
                    format: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                },
            } ),
        ]
    }
};
