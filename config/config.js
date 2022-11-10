const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "MON_SECRET_KEY",
    mongoUri: process.env.MONGO_HOST || "mongodb+srv://test:hkAYEyQA5VgHtWoi@testdb.kpbihfl.mongodb.net/?retryWrites=true&w=majority"
}

export default config