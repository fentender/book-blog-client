module.exports = {
    devServer: {
        port: 3000,
        proxy: 'http://localhost:8080'
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    parser: {
                        amd: false
                    }
                }
            ]
        }
    }
  }