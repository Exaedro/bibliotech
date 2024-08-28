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
     * @param {integer} genre - id del genero
     * @returns 
     */
    static async getAllByGenreId({ genre }) {
        const db = await connection()

        const [books] = await db.query(`SELECT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN libros_categorias lc ON l.LibroID = lc.LibroID JOIN categorias c ON lc.CategoriaID = c.CategoriaID WHERE c.CategoriaID = ${genre}`)
    
        return books
    }

    static async getCategories() {
        const db = await connection()

        const [categories] = await db.query('SELECT c.CategoriaID, c.NombreCategoria FROM categorias c')

        return categories
    }

    static async createBook({ title, author, isbn, date, pages, language, publisher, synopsis, image, pdfLink, state, categories }) {
        const db = await connection()

        await db.query(`INSERT INTO libros (Titulo, Autor, ISBN, FechaLanzamiento, CantidadPaginas, Idioma, Editorial, Sinopsis, imagen, pdf_link, Estado) VALUES ('${title}', '${author}', '${isbn}', '${date}', '${pages}', '${language}', '${publisher}', '${synopsis}', '${image}', '${pdfLink}', '${state}')`)
    
        // Insertar categorías en la tabla de libros_categorias
        const [bookId] = await db.query(`SELECT LibroID FROM libros WHERE Titulo = '${title}'`)
    
        categories.forEach(async categorie => {
            await db.query(`INSERT INTO libros_categorias (LibroID, CategoriaID) VALUES ('${bookId[0].LibroID}', '${categorie}')`)
        })
    }

    /**
     * 
     * @param {integer} limit - cantidad de libros que se va a obtener 
     */
    static async getRecent({ limit } = 8) {
        const db = await connection()

        const [books] = await db.query(`SELECT * FROM libros LIMIT ${limit}`)

        return books
    }

    /**
     * 
     * @param {integer} limit - cantidad de libros que se va a obtener 
     */
    static async getMostLiked({ limit }) {
        const db = await connection()

        const [books] = await db.query(`SELECT * FROM libros ORDER BY Gustados ASC LIMIT ${limit}`)

        return books
    }

    /**
     * 
     * @param {integer} limit - cantidad de libros que se va a obtener 
     */
    static async getMostVisited({ limit }) {
        const db = await connection()

        const [books] = await db.query(`SELECT * FROM libros ORDER BY Visitas ASC LIMIT ${limit}`)

        return books
    }

    /**
     * 
     * @param {integer} id - id del libro 
     */
    static async getById({ id }) {
        const db = await connection()

        const [book] = await db.query(`SELECT * FROM libros JOIN libros_categorias lc ON lc.LibroID = libros.LibroID JOIN categorias c ON lc.CategoriaID = c.CategoriaID WHERE libros.LibroID = ${id}`)

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