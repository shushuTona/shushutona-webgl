const path = require( "path" );

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.join( __dirname, 'docs' ),
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
        watchContentBase: true,
        port: 3000,
    }
};
