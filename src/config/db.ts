import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DABATABASE_URL!, {
  host: 'localhost',
  dialect: 'postgres'
})

export default db