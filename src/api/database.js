import mysql from 'mysql2/promise'

import { DatabaseError } from './utils/error.js'

const DATABASE_CONFIG = {
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
}

class db {
    static async query(sql) {
        try {
            const db = await mysql.createConnection({ ...DATABASE_CONFIG })
            
            const data = await db.query(sql)
            await db.end()
        
            return data
        } catch(err) {
            throw new DatabaseError('error connecting to database, check if the server is running')
        }
    }
}

export default db