module.exports = {
    //entry: './main',
    //
    output: {
        //path: './js',
        filename: 'bundle-w.js'
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: "babel" }
        ]
    },
    watch: true
};