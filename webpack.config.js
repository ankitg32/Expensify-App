//entry point -> output

const path = require('path'); //to load path module
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //refer: https://www.npmjs.com/package/extract-text-webpack-plugin

console.log(path.join(__dirname, 'public'));

//we can choose to return module.exports directly as an object or as a function that returns that object
//the advantage of using the function mode is that we get access to env argument. refer: https://webpack.js.org/configuration/configuration-types/
module.exports = (env) => {
    console.log("env", env);
    const isProduction = env === "production";
    const CSSExtract = new ExtractTextPlugin('styles.css'); //argument passed will be the name of the extarcte file

    return {
        entry: './src/app.js', //entry path is relative
        output: { 
            path: path.join(__dirname, 'public'), //output path is ABSOLUTE, NOT RELATIVE
            filename: 'bundle.js'
        },
        //loader -> to do something with the file seen by the webpack
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js/, //regular expression
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                            // 'css-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            // 'sass-loader'
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                        ]
                    })
                    /* commenting this out to use CSSExtract
                    use: [
                        // Creates `style` nodes from JS strings (CSS-in-JS->inject style tag to DOM)
                        'style-loader',
                        // Translates CSS into CommonJS (CSS->CSS-in-JS)
                        'css-loader',
                        // Compiles Sass to CSS (Sass->CSS)
                        'sass-loader',
                    ], //using 'use' instead of loaders because it allows the use of an array of loaders
                    test: /\.s?css$/, //regular expression
                    // node-sass provides binding for Node.js to LibSass, a Sass compiler.
                    // sass-loader is a loader for Webpack for compiling SCSS/Sass files.
                    // style-loader injects our styles into our DOM.
                    // css-loader interprets @import and @url() and resolves them.
                    // mini-css-extract-plugin extracts our CSS out of the JavaScript bundle into a separate file, essential for production builds.
                    */
                }
            ]
        },
        plugins: [
            CSSExtract
        ],
        //the 'cheap-module-eval-source-map' source map is big and fast but for production we need the build to be smaller and as light as possible
        // devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map', //there are many devtools that help us in debugging

        //using the dev source map that works best with the same code as prod source map
        devtool: isProduction ? 'source-map' : 'inline-source-map',

        //these point to the right react component js file rather than the bundle.js file that helps us in decoding
        devServer: {
            contentBase: path.join(__dirname, 'public'), //specifies the path to server the content from
            historyApiFallback: true
        }
        //for dev server APIs, refer: https://webpack.js.org/configuration/dev-server/
    };
}

