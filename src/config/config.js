import { config as conf } from "dotenv"
conf()
const _config = {
    port : process.env.PORT,
    databaseUrl : process.env.MONGODB_URI_STRING,
    localdatabaseUrl : process.env.LOCAL_MONGODB_URI_STRING,
    CORS_ORIGIN : process.env.CORS_ORIGIN,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY:process.env.ACCESS_TOKEN_EXPIRY,
    SMTP_HOST:process.env.SMTP_HOST,
    SMTP_PORT:process.env.SMTP_PORT,
    SMTP_USER:process.env.SMTP_USER,
    SMTP_PASS:process.env.SMTP_PASS,
}

export const config = Object.freeze(_config)