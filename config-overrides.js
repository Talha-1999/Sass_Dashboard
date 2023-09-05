module.exports = function override(config, env) {
    //do stuff with the webpack config...
    // return {
    //     module: {
    //         rules: [
    //             {
    //                 test: /\.html$/i,
    //                 loader: "html-loader",
    //             },
    //         ],
    //     },
    // };

    config.module.rules = [...config.module.rules,
    {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
            // Disables attributes processing
            attributes: true,
        },
    },
    {
        test: /\.jsx?$/,
        exclude: filename => {
            return /node_modules/.test(filename) && !/@flatfile\/sdk\/dist/.test(filename)
        },
        use: ['babel-loader']
    }
    ]

    return config
}