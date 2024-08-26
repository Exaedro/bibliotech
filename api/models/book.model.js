// Base de datos
import connection from "../database.js";

class BookModel {
    static async getAll() {
        const db = await connection()

        const [books] = await db.query('SELECT * FROM libros')

        return books
    }

    /**
     * 
     * @param {integer} id - id del libro 
     */
    static async getById({ id }) {
        const db = await connection()

        const [book] = await db.query(`SELECT * FROM libros WHERE LibroID = ${id}`)

        return book
    }

    /**
     * 
     * @param {string} title - titulo del libro 
     */
    static async getByTitle({ title }) {
        const db = await connection()

        const [book] = await db.query(`SELECT * FROM libros WHERE Titulo LIKE '%${title}%'`)

        return book
    }

    /**
     * 
     * @param {integer} id 
     * @param {string} title 
     * @param {string} author 
     * @param {string} isbn 
     * @param {integer} pages 
     * @param {string} language 
     * @param {string} state
     * @param {string} synopsis
     * @param {object} file
     */
    static async editById({ id, title, author, isbn, pages, language, state, synopsis, file }) {
        const db = await connection()

        // Si el usuario ingreso una portada se le agrega a la consulta el campo "imagen"
        let sql = `UPDATE libros SET Titulo = '${title}', Autor = '${author}', ISBN = '${isbn}', CantidadPaginas = '${pages}', Idioma = '${language}', Estado = '${state}', Sinopsis = '${synopsis}' WHERE LibroID = ${id};`
        if(file) sql = `UPDATE libros SET Titulo = '${title}', Autor = '${author}', ISBN = '${isbn}', CantidadPaginas = '${pages}', Idioma = '${language}', Estado = '${state}', Sinopsis = '${synopsis}', imagen = '/uploads/${file.filename}' WHERE LibroID = ${id};`

        await db.query(sql)
    }

    /**
     * 
     * @param {integer} id - id del libro 
     */
    static async deleteById({ id }) {
        const db = await connection()

        await db.query(`DELETE FROM libros WHERE LibroID = ${id}`)
    }
}

export default BookModel