const config = {
    app: {
        port: 8000
    },
    mongodb: {
        url: "mongodb://localhost:27017/instasao"
    },
    session: {
        secret: process.env.SESSION_SECRET || "this is a bad secret"
    }
}
exports.config = config;