import mysql from 'mysql2/promise'

const DATABASE_CONFIG = {
    user: 'root',
    database: 'bibliotech_v2',
    password: '',
    port: 3306,
    host: 'localhost',
}

class db {
    static async query(sql) {
        try {
            const db = await mysql.createConnection({ ...DATABASE_CONFIG })
            
            const data = await db.query(sql)
        
            return data
        } catch(err) {
            console.error(err)
        }
    }
}

export default db