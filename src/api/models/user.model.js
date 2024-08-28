// Librerias
import { hash, compare } from "bcrypt";

// Base de datos
import connection from "../database.js";

class UserModel {
    /**
     * 
     * @param {string} username - nombre de usuario
     * @param {string} password - la contraseña del usuario
     * @param {string} email - el correo electronico del usuario 
     */
    static async createUser({ username, password, email }) {
        const db = await connection()

        // Verificar si el nombre de usuario no esta usado por otra persona
        const isUsernameUsed = await usernameExists({ username, db })
        if(isUsernameUsed) return 'username_used'

        // Verificar si el email no esta usado por otra persona
        const isEmailUsed = await userExists({ email, db })
        if(isEmailUsed) return 'email_used'

        // Encriptar la contraseña
        const hashedPassword = await hash(password, 10)

        // Insertar usuario
        await db.query(`INSERT INTO usuarios (Nombre, CorreoElectronico, Contrasenia) VALUES ('${username}', '${email}', '${hashedPassword}')`)
    }

    /**
     * 
     * @param {string} email - email del usuario
     * @param {string} password - contraseña del usuario 
     * @returns 
     */
    static async LogUser({ email, password }) {
        const db = await connection()

        const [user] = await db.query(`SELECT r.NombreRol as role, u.Contrasenia as password, u.Nombre as username, u.UsuarioID as id FROM usuarios u JOIN roles r ON u.RollID = r.RollID  WHERE u.CorreoElectronico = '${email}';`)
        if(user.length == 0) return 'user_not_exist'

        const validPassword = await compare(password, user[0].password)
        if(!validPassword) return 'invalid_password'

        return user
    }

    /**
     * 
     * @param {integer} userId - id del usuario 
     */
    static async getUserById({ userId }) {
        const db = await connection()

        const [user] = await db.query(`SELECT * FROM usuarios WHERE UsuarioID = '${userId}'`)

        return user
    }

    /**
     * 
     * @param {integer} id - id del usuario
     * @param {string} username - nombre del usuario
     * @param {string} email - correo electronico del usuario
     * @param {string} password - contraseña del usuario
     * @param {string} role - rol en la aplicacion del usuario
     * @param {string} avatar - foto de perfil del usuario
     */
    static async editUser({ userId, username, email, password, role, avatar }) {
        const db = await connection()

        const [user] = await this.getUserById({ userId })
        if(!user) return 'user_not_exist'

        username = username ? username : user.Nombre
        email    = email ? email : user.CorreoElectronico
        password = password ? password : user.Contrasenia
        role     = role ? role : user.RollID
        avatar   = avatar ? avatar : user.Imagen

        await db.query(`UPDATE usuarios SET Nombre = '${username}', CorreoElectronico = '${email}', Imagen = '${avatar}' WHERE UsuarioID = '${userId}'`)
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {string} password - contraseña que ingreso el usuario 
     */
    static async validPassword({ userId, password }) {
        const db = await connection()

        const user = await this.getUserById({ userId })

        if(user.length <= 0) {
            return 'user_not_exist'
        }

        const verify = await compare(password, user[0].Contrasenia)

        if(!verify)
            return false

        return true
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @returns 
     */
    static async getUserRecord({ userId }) {
        const db = await connection()

        const [books] = await db.query(`SELECT * FROM historial h JOIN libros l ON h.LibroID = l.LibroID WHERE h.UsuarioID = ${userId} ORDER BY FechaAccion DESC LIMIT 3`) 

        return books
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {integer} bookId - id del libro
     */
    static async addRecord({ userId, bookId }) {
        const db = await connection()

        const isAlreadyAdded = await isDuplicated({ userId, bookId, type: 'historial', db })
        if(isAlreadyAdded) return 'duplicated'

        await db.query(`INSERT INTO historial (UsuarioID, LibroID) VALUES ('${userId}', '${bookId}');`)
    }

    /**
     * 
     * @param {integer} userId - id del usuario 
     */
    static async getFavorites({ userId }) {
        const db = await connection()

        const [books] = await db.query(`SELECT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN favoritos f ON f.LibroID = l.LibroID WHERE f.UsuarioID = ${userId}`)

        return books
    }

    /**
     * 
     * @param {integer} userId - id del usuario 
     */
    static async getLikes({ userId }) {
        const db = await connection()

        const [books] = await db.query(`SELECT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN gustados f ON f.LibroID = l.LibroID WHERE f.UsuarioID = ${userId}`)

        return books
    }

    /**
     * 
     * @param {integer} userId - id del usuario  
     */
    static async getLater({ userId }) {
        const db = await connection()

        const [books] = await db.query(`SELECT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN ver_mas_tarde f ON f.LibroID = l.LibroID WHERE f.UsuarioID = ${userId}`)

        return books
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {integer} bookId - id del libro 
     */
    static async addFavorite({ userId, bookId }) {
        const db = await connection()

        const isAlreadyAdded = await isDuplicated({ userId, bookId, type: 'favoritos', db })
        if(isAlreadyAdded) return 'duplicated'

        await db.query(`INSERT INTO favoritos (UsuarioID, LibroID) VALUES ('${userId}', '${bookId}');`)
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {integer} bookId - id del libro 
     */
    static async addLike({ userId, bookId }) {
        const db = await connection()

        const isAlreadyAdded = await isDuplicated({ userId, bookId, type: 'gustados', db })
        if(isAlreadyAdded) return 'duplicated'

        await db.query(`INSERT INTO gustados (UsuarioID, LibroID) VALUES ('${userId}', '${bookId}');`)
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {integer} bookId - id del libro 
     */
    static async addSeeLater({ userId, bookId }) {
        const db = await connection()

        const isAlreadyAdded = await isDuplicated({ userId, bookId, type: 'ver_mas_tarde', db })
        if(isAlreadyAdded) return 'duplicated'

        await db.query(`INSERT INTO ver_mas_tarde (UsuarioID, LibroID) VALUES ('${userId}', '${bookId}');`)
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {integer} bookId - id del libro 
     */
    static async deleteFavorite({ userId, bookId }) {
        const db = await connection()

        await db.query(`DELETE FROM favoritos WHERE UsuarioID = '${userId}' AND LibroID = '${bookId}'`)
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {integer} bookId - id del libro 
     */
    static async deleteLike({ userId, bookId }) {
        const db = await connection()

        await db.query(`DELETE FROM gustados WHERE UsuarioID = '${userId}' AND LibroID = '${bookId}'`)
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {integer} bookId - id del libro 
     */
    static async deleteSeeLater({ userId, bookId }) {
        const db = await connection()

        await db.query(`DELETE FROM ver_mas_tarde WHERE UsuarioID = '${userId}' AND LibroID = '${bookId}'`)
    }
}

/**
 * 
 * @param {integer} userId - id del usuario
 * @param {integer} bookId - id del libro 
 * @param {string} type - nombre de la tabla en la base de datos a utilizar (gustados, favoritos, ver_mas_tarde)
 * @param {object} db - variable de la base de datos
 */
async function isDuplicated({ userId, bookId, type, db }) {
    const [verify] = await db.query(`SELECT * FROM ${type} WHERE UsuarioID = '${userId}' AND LibroID = '${bookId}';`)

    if(verify.length > 0)
        return true

    return false
}

/**
 * 
 * @param {string} username - nombre de usuario
 * @param {object} db - variable de la base de datos 
 * @returns 
 */
async function usernameExists({ username, db }) {
    const [user] = await db.query(`SELECT * FROM usuarios WHERE Nombre = '${username}'`)

    // Si encuentra un usuario con el nombre ingresado
    // retorna que este nombre ya esta registrado
    if(user.length >= 1)
        return true

    // Si no encuentra nada
    // retorna que el nombre no esta registrado
    return false
}

/**
 * 
 * @param {string} email - correo electronico del usuario
 * @param {object} db - variable de la base de datos 
 * @returns 
 */
async function userExists({ email, db }) {
    const [user] = await db.query(`SELECT * FROM usuarios WHERE CorreoElectronico = '${email}'`)

    // Si se encuentra un usuario o mas en la base de datos
    // retorna que existe un usuario con este email
    if(user.length >= 1)
        return user

    // Si no hay nadie registrado con este email
    // retorna que no hay nadie
    return false
}

export default UserModel