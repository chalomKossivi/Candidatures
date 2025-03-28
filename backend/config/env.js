import dotevn from 'dotenv'

dotevn.config()

const ENV = {
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    URI_MONGO: process.env.URI_MONGO
}
export default ENV;