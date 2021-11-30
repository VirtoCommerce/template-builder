module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        ident: 'postcss',
                        syntax: 'postcss-scss',
                        plugins:  (loader) => [
                            require('postcss-import')({
                                root: loader.resourcePath
                            }),
                            require('tailwindcss'),
                            require('autoprefixer')
                        ]
                    }
                }
            }
        ]
    }
};
