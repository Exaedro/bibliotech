// Librerias
import { encryptPassword } from "../utils/encryptPassword.js";
import { validPassword } from "../utils/validPassword.js";
import { compare } from "bcrypt";

// Base de datos
import db from "../database.js";

class UserModel {
    static async getAll() {
        const [users] = await db.query('SELECT UsuarioID, Nombre, CorreoElectronico, Imagen, RollID FROM usuarios')

        const data = users.map(user => {
            return {
                id: user.UsuarioID,
                username: user.Nombre,
                email: user.CorreoElectronico,
                image: user.Imagen,
                roleId: user.RollID
            }
        })

        return data
    }

    /**
     * 
     * @param {integer} id - id del usuario 
     */
    static async getUserById({ id }) {
        const [user] = await db.query(`SELECT * FROM usuarios WHERE UsuarioID = ?`, [id])

        const data = user.map(userInfo => {
            return {
                id: userInfo.UsuarioID,
                username: userInfo.Nombre,
                email: userInfo.CorreoElectronico,
                image: userInfo.Imagen,
                roleId: userInfo.RollID,
                password: userInfo.Contrasenia
            }
        })

        return data
    }

    /**
     * 
     * @param {string} username - nombre de usuario
     * @param {string} password - la contraseña del usuario
     * @param {string} email - el correo electronico del usuario 
     */
    static async createUser({ username, password, email, image = process.env.DEFAULT_AVATAR, role = process.env.DEFAULT_ROLE }) {
        // Verificar si el nombre de usuario no esta usado por otra persona
        const isUsernameUsed = await usernameExists({ username })
        if (isUsernameUsed) return 'username_used'

        // Verificar si el email no esta usado por otra persona
        const isEmailUsed = await userExists({ email })
        if (isEmailUsed) return 'email_used'

        // Encriptar la contraseña
        const hashedPassword = await encryptPassword({ password })

        // Insertar usuario
        await db.query(`INSERT INTO usuarios (Nombre, CorreoElectronico, Contrasenia, Imagen, RollID) VALUES (?, ?, ?, ?, ?)`, [username, email, hashedPassword, image, role])
    }

    /**
     * 
     * @param {string} email - email del usuario
     * @param {string} password - contraseña del usuario 
     * @returns 
     */
    static async login({ email, password }) {
        const [user] = await db.query(`SELECT r.NombreRol as role, u.Contrasenia as password, u.correoElectronico as email, u.Nombre as username, u.UsuarioID as id, u.Imagen as image FROM usuarios u JOIN roles r ON u.RollID = r.RollID  WHERE u.CorreoElectronico = ?`, [email])
        if (user.length == 0) return 'user_not_exist'

        const isPasswordValid = await validPassword({ password, hash: user[0].password })
        if (!isPasswordValid) return 'invalid_password'

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
    static async editUser({ id, username = '', email = '', password = '', role = '', avatar }) {
        const [user] = await this.getUserById({ id })
        if (!user) return 'user_not_exist'

        username = username.length == 0 ? user.username : username
        email = email.length == 0 ? user.email : email
        role = role.length == 0 ? user.roleId : role
        avatar = avatar ? avatar : user.image

        let hashedPassword
        if(password.length == 0)
            hashedPassword = user.password
        else
            hashedPassword = await encryptPassword({ password })

        await db.query(`UPDATE usuarios SET Nombre = ?, CorreoElectronico = ?, Imagen = ?, Contrasenia = ? WHERE UsuarioID = ?`, [username, email, avatar, hashedPassword, id])
    }

    static async deleteUser({ id }) {
        const [user] = await db.query(`SELECT * FROM usuarios WHERE UsuarioID = ?`, [id])
        if (user.length <= 0) return 'user_not_exist'

        await db.query(`DELETE FROM usuarios WHERE UsuarioID = ?`, [id])
    }

    /**
     * 
     * @param {integer} id - id del usuario
     * @param {string} password - contraseña que ingreso el usuario 
     */
    static async validPassword({ id, password }) {
        const user = await this.getUserById({ id })

        if (user.length <= 0) {
            return 'user_not_exist'
        }

        if (!password)
            return 'password_undefined'

        const verify = await compare(password, user[0].password)

        if (!verify)
            return false

        return true
    }

    /**
     * 
     * @param {integer} id - id del usuario
     * @param {string} order - orden de la consulta
     * @returns 
     */
    static async getUserRecord({ id, order = 'DESC', limit = 3 }) {
        if (id == undefined) return 'user_not_logged'

        const [books] = await db.query(`SELECT * FROM historial h JOIN libros l ON h.LibroID = l.LibroID WHERE h.UsuarioID = ? ORDER BY FechaAccion ${order} LIMIT ${limit}`, [id])

        const data = books.map(book => {
            return {
                user: {
                    recordId: book.HistorialID,
                    recordDate: book.FechaAccion,
                    id: book.UsuarioID
                },
                book: {
                    id: book.LibroID,
                    title: book.Titulo,
                    image: book.imagen,
                    isbn: book.ISBN,
                    year: book.FechaLanzamiento.getFullYear(),
                    pages: book.CantidadPaginas,
                    publisher: book.Editorial,
                    synopsis: book.Sinopsis,
                    author: book.Autor,
                    language: book.Idioma,
                    state: book.Estado,
                    visits: book.Visitas,
                    likes: book.Gustados
                }
            }
        })

        return data
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {integer} bookId - id del libro
     */
    static async addRecord({ userId, bookId }) {
        // Si el usuario tiene 3 libros en su historial, se elimina el libro mas reciente
        const books = await this.getUserRecord({ id: userId, order: 'ASC' })

        // if (books.length >= 3) {
        //     const bookId = books[0].book.id
        //     await db.query(`DELETE FROM historial WHERE LibroID = ? AND UsuarioID = ?`, [bookId, userId])
        // }

        const isAlreadyAdded = await isDuplicated({ userId, bookId, type: 'historial' })
        if (isAlreadyAdded) return 'duplicated'

        await db.query(`INSERT INTO historial (UsuarioID, LibroID) VALUES (?, ?)`, [userId, bookId])
    }

    static async deleteRecord({ id }) {
        await db.query(`DELETE FROM historial WHERE HistorialID = ?`, [id])
    }

    /**
     * 
     * @param {integer} id - id del usuario 
     */
    static async getFavorites({ id }) {
        const userExists = await this.getUserById({ id })
        if (userExists.length == 0) return 'user_not_exists'

        const [books] = await db.query(`SELECT l.LibroID as id, l.Titulo as title, l.imagen as image FROM libros l JOIN favoritos f ON f.LibroID = l.LibroID WHERE f.UsuarioID = ?`, [id])

        return books
    }

    /**
     * 
     * @param {integer} id - id del usuario 
     */
    static async getLikes({ id }) {
        const userExists = await this.getUserById({ id })
        if (userExists.length == 0) return 'user_not_exists'

        const [books] = await db.query(`SELECT l.LibroID as id, l.Titulo as title, l.imagen as image FROM libros l JOIN gustados f ON f.LibroID = l.LibroID WHERE f.UsuarioID = ?`, [id])

        return books
    }

    /**
     * 
     * @param {integer} id - id del usuario  
     */
    static async getLater({ id }) {
        const userExists = await this.getUserById({ id })
        if (userExists.length == 0) return 'user_not_exists'
        
        const [books] = await db.query(`SELECT l.LibroID as id, l.Titulo as title, l.imagen as image FROM libros l JOIN ver_mas_tarde f ON f.LibroID = l.LibroID WHERE f.UsuarioID = ?`, [id])

        return books
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {integer} bookId - id del libro 
     */
    static async addFavorite({ userId, bookId }) {
        const isAlreadyAdded = await isDuplicated({ userId, bookId, type: 'favoritos' })
        if (isAlreadyAdded) return 'duplicated'

        await db.query(`INSERT INTO favoritos (UsuarioID, LibroID) VALUES (?, ?)`, [userId, bookId])
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {integer} bookId - id del libro 
     */
    static async addLike({ userId, bookId }) {
        const isAlreadyAdded = await isDuplicated({ userId, bookId, type: 'gustados' })
        if (isAlreadyAdded) return 'duplicated'

        await db.query(`INSERT INTO gustados (UsuarioID, LibroID) VALUES (?, ?)`, [userId, bookId])
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {integer} bookId - id del libro 
     */
    static async addSeeLater({ userId, bookId }) {
        const isAlreadyAdded = await isDuplicated({ userId, bookId, type: 'ver_mas_tarde' })
        if (isAlreadyAdded) return 'duplicated'

        await db.query(`INSERT INTO ver_mas_tarde (UsuarioID, LibroID) VALUES (?, ?)`, [userId, bookId])
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {integer} bookId - id del libro 
     */
    static async deleteFavorite({ userId, bookId }) {
        await db.query(`DELETE FROM favoritos WHERE UsuarioID = ? AND LibroID = ?`, [userId, bookId])
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {integer} bookId - id del libro 
     */
    static async deleteLike({ userId, bookId }) {
        await db.query(`DELETE FROM gustados WHERE UsuarioID = ? AND LibroID = ?`, [userId, bookId])
    }

    /**
     * 
     * @param {integer} userId - id del usuario
     * @param {integer} bookId - id del libro 
     */
    static async deleteSeeLater({ userId, bookId }) {
        await db.query(`DELETE FROM ver_mas_tarde WHERE UsuarioID = ? AND LibroID = ?`, [userId, bookId])
    }
}

/**
 * 
 * @param {integer} userId - id del usuario
 * @param {integer} bookId - id del libro 
 * @param {string} type - nombre de la tabla en la base de datos a utilizar (gustados, favoritos, ver_mas_tarde)
 */
async function isDuplicated({ userId, bookId, type }) {
    const [verify] = await db.query(`SELECT * FROM ${type} WHERE UsuarioID = ? AND LibroID = ?;`, [userId, bookId])

    if (verify.length > 0)
        return true

    return false
}

/**
 * 
 * @param {string} username - nombre de usuario
 * @returns 
 */
async function usernameExists({ username }) {
    const [user] = await db.query(`SELECT * FROM usuarios WHERE Nombre = ?`, [username])

    // Si encuentra un usuario con el nombre ingresado
    // retorna que este nombre ya esta registrado
    if (user.length >= 1)
        return true

    // Si no encuentra nada
    // retorna que el nombre no esta registrado
    return false
}

/**
 * 
 * @param {string} email - correo electronico del usuario
 * @returns 
 */
async function userExists({ email }) {
    const [user] = await db.query(`SELECT * FROM usuarios WHERE CorreoElectronico = ?`, [email])

    // Si se encuentra un usuario o mas en la base de datos
    // retorna que existe un usuario con este email
    if (user.length >= 1)
        return user

    // Si no hay nadie registrado con este email
    // retorna que no hay nadie
    return false
}

export default UserModel