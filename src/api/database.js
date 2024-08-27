import mysql from 'mysql2/promise.js'

const connection = async () => {
    try {
        const db = await mysql.createConnection({
            user: 'root',
            database: 'bibliotech_v2',
            password: '',
            port: 3306,
            host: 'localhost'
        })
        
        db.connect(err => { 
            if(err) throw new err
        })
    
        return db
    } catch(err) {
        console.error(err)
    }
}

export default connection