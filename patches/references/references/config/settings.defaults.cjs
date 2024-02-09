module.exports = {
    internal: {
        contacts: {
            port: 3040,
            host: process.env.LISTEN_ADDRESS || 'localhost',
        },
    },


    apis: {
        web: {
            url: `http://${process.env.WEB_HOST || 'localhost'}:${process.env.WEB_PORT || 3000
                }`,
            user: process.env.WEB_API_USER || 'sharelatex',
            pass: process.env.WEB_API_PASSWORD || 'password',
        },
    },

    // mongo: {
    //     url:
    //         process.env.MONGO_CONNECTION_STRING ||
    //         `mongodb://${process.env.MONGO_HOST || 'localhost'}/sharelatex`,
    // },

    elasticsearch: {
        url: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
    },
}
