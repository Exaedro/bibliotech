// Base de datos
import db from "../database.js";

import { bookObject } from "../utils/bookObject.js";

class BookModel {
    /**
     * 
     * @param {string} title - titulo del libro
     * @param {string} author - autor del libro
     * @param {string} date - fecha de lanzamiento del libro
     * @param {string} genre - categoria del libro
     */
    static async search({ title, author, date, genre, isbn, pages, language, publisher }) {
        const params = {
            Titulo: title || undefined,
            Autor: author || undefined,
            FechaLanzamiento: date || undefined,
            CategoriaID: genre || undefined,
            ISBN: isbn || undefined,
            CantidadPaginas: pages || undefined,
            Idioma: language || undefined,
            Editorial: publisher || undefined
        }
        const paramsKeys = Object.keys(params)

        let sql = `SELECT DISTINCT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN libros_categorias lc ON l.LibroID = lc.LibroID JOIN categorias c ON lc.CategoriaID = c.CategoriaID`
       
        // Variable para saber si existe algun parametro en el objeto
        let whereExists = false

        // Verificar si existe algun parametro en el objeto
        for(let i = 0; i < paramsKeys.length; i++) {
            const key = paramsKeys[i]
            const value = params[key]

            // Si existe un parametro, se agrega al SELECT
            if(value) {
                // Si ya existe un parametro, se agrega un AND
                if(whereExists) {

                    // Si es una categoria se cambia la L del join por una C
                    if(key == 'CategoriaID') { 
                        sql += ` AND c.CategoriaID = '${value}'`
                    }
                    else { 
                        if(key == 'FechaLanzamiento') {
                            sql += ` AND YEAR(l.FechaLanzamiento) = '${value}'`
                        } else {

                            if(key == 'CantidadPaginas') {
                                sql += ` AND l.CantidadPaginas >= '${value}'`
                            } else {
                                sql += ` AND l.${key} LIKE '%${value}%'`
                            }
                        }
                    }
                } else {
                    // Si no existe un parametro, se agrega un WHERE
                    if(!whereExists) sql += ` WHERE ` 

                    if(key == 'CategoriaID')
                        sql += ` c.CategoriaID = '${value}'`
                    else { 
                        if(key == 'FechaLanzamiento') {
                            sql += ` YEAR(l.FechaLanzamiento) = '${value}'`
                        } else { 
                            if(key == 'CantidadPaginas') {
                                sql += ` l.CantidadPaginas >= '${value}'`
                            } else {
                                sql += ` l.${key} LIKE '%${value}%'`
                            }
                        }
                    }     
                }
                
                // Marcar que existe un parametro
                whereExists = true
            }
        }

        const [books] = await db.query(sql)
        
        const data = books.map(book => { return { id: book.LibroID, title: book.Titulo, image: book.imagen } })

        return data
    }

    static async getAll() {
        const [books] = await db.query('SELECT * FROM libros')

        const data = bookObjectComplex({ data: books })
            
        return data
    }

    /** 
     * @param {integer} genre - id del genero
     * @returns 
     */
    static async getAllByGenreId({ genre }) {
        const [books] = await db.query(`SELECT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN libros_categorias lc ON l.LibroID = lc.LibroID JOIN categorias c ON lc.CategoriaID = c.CategoriaID WHERE c.CategoriaID = ${genre}`)

        return books
    }

    static async getCategories() {
        const [categories] = await db.query('SELECT c.CategoriaID, c.NombreCategoria FROM categorias c')

        const data = categories.map(category => { return { id: category.CategoriaID, name: category.NombreCategoria } })
        
        return data
    }

    /**
     * 
     * @param {integer} bookId - id del libro
     * @returns 
     */
    static async getCategoriesByBookId({ bookId }) {
        const [categories] = await db.query(`SELECT lc.CategoriaID, c.NombreCategoria FROM libros_categorias lc JOIN categorias c ON lc.CategoriaID = c.CategoriaID WHERE lc.LibroID = ${bookId}`)

        return categories
    }

    /**
     * 
     * @param {string} title - titulo del libro
     * @param {string} author - autor del libro
     * @param {string} isbn - isbn del libro
     * @param {string} date - fecha de lanzamiento del libro
     * @param {string} pages - cantidad de paginas del libro
     * @param {string} language - idioma del libro
     * @param {string} publisher - editorial del libro
     * @param {string} synopsis - sinopsis del libro
     * @param {string} image - imagen del libro
     * @param {string} pdfLink - pdf del libro
     * @param {string} state - estado del libro
     * @param {array} categories - array de categorias del libro
     */
    static async createBook({ title, author, isbn, date, pages, language, publisher, synopsis, image, pdfLink, state, categories }) {
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
        const [books] = await db.query(`SELECT * FROM libros LIMIT ${limit}`)

        const data = bookObjectComplex({ data: books })

        return data
    }

    /**
     * 
     * @param {integer} limit - cantidad de libros que se va a obtener 
     */
    static async getMostLiked({ limit }) {
        const [books] = await db.query(`SELECT * FROM libros ORDER BY Gustados ASC LIMIT ${limit}`)

        const data = bookObjectComplex({ data: books })

        return data
    }

    /**
     * 
     * @param {integer} limit - cantidad de libros que se va a obtener 
     */
    static async getMostVisited({ limit }) {
        const [books] = await db.query(`SELECT * FROM libros ORDER BY Visitas ASC LIMIT ${limit}`)

        const data = bookObjectComplex({ data: books })

        return data
    }

    /**
     * 
     * @param {integer} id - id del libro 
     */
    static async getById({ id }) {
        const [book] = await db.query(`SELECT * FROM libros JOIN libros_categorias lc ON lc.LibroID = libros.LibroID JOIN categorias c ON lc.CategoriaID = c.CategoriaID WHERE libros.LibroID = ${id}`)

        const object = bookObject({ data: book })

        return object
    }

    /**
     * 
     * @param {string} title - titulo del libro 
     */
    static async getByTitle({ title }) {
        const [book] = await db.query(`SELECT * FROM libros WHERE Titulo LIKE '%${title}%'`)

        const object = bookObject({ data: book })

        return object
    }

    /**
     * 
     * @param {integer} id - id del libro
     * @param {string} title - titulo del libro
     * @param {string} author - autor del libro
     * @param {string} isbn - isbn del libro
     * @param {integer} pages - cantidad de paginas del libro
     * @param {string} language - idioma del libro
     * @param {string} state - estado del libro
     * @param {string} synopsis - sinopsis del libro
     * @param {object} file - imagen del libro
     */
    static async editById({ id, title, author, date, isbn, pages, language, publisher , state, synopsis, categories, file }) {

        console.log(date)
        // Si el usuario ingreso una portada se le agrega a la consulta el campo "imagen"
        let sql = `UPDATE libros SET Titulo = '${title}', Autor = '${author}', Editorial = '${publisher}', FechaLanzamiento = '${date}', ISBN = '${isbn}', CantidadPaginas = '${pages}', Idioma = '${language}', Estado = '${state}', Sinopsis = '${synopsis}' WHERE LibroID = ${id};`
        if(file) sql = `UPDATE libros SET Titulo = '${title}', Autor = '${author}', Editorial = '${publisher}', FechaLanzamiento = '${date}', ISBN = '${isbn}', CantidadPaginas = '${pages}', Idioma = '${language}', Estado = '${state}', Sinopsis = '${synopsis}', imagen = '${file}' WHERE LibroID = ${id};`

        // if(categories.length > 0) {
        //     categories.forEach(async categorie => {
        //         await db.query('INSERT INTO libros_categorias (LibroID, CategoriaID) VALUES (?, ?)', [id, categorie])
        //     })
        // }

        await db.query(sql)
    }

    /**
     * 
     * @param {integer} bookId - id del libro 
     */
    static async deleteById({ bookId }) {

        await db.query(`DELETE FROM libros WHERE LibroID = '${bookId}'`)
    }
}

/* 
    * Funcion para convertir los datos de la base de datos a un objeto 
    ! SE UTILIZA PARA ARRAYS DE VARIOS LIBROS, NO SOLO UN LIBRO EN PARTICULAR
    ! SI NECESITA EL OBJETO DE SOLO UN LIBRO, SE DEBE USAR EL METODO bookObject
*/

/**
 * 
 * @param {object} data - array de libros
 * @returns 
 */
function bookObjectComplex({ data }) {
    const books = Promise.all(data.map(async book => {

        // Obtener los generos de del libro
        const genresArray = await BookModel.getCategoriesByBookId({ bookId: book.LibroID })
        const genres = genresArray.map(genre => { return { id: genre.CategoriaID, name: genre.NombreCategoria } })
        
        return {
            id: book.LibroID,
            title: book.Titulo,
            author: book.Autor,
            isbn: book.ISBN,
            year: book.FechaLanzamiento.getFullYear(),
            pages: book.CantidadPaginas,
            publisher: book.Editorial,
            synopsis: book.Sinopsis,
            image: book.imagen,
            pdfLink: book.pdf_link,
            language: book.Idioma,
            state: book.Estado,
            visits: book.Visitas,
            likes: book.Gustados,
            genres
        }
    }))

    return books
}

/* 
    * Funcion para convertir los datos de la base de datos a un objeto 
    ! SE UTILIZA PARA ARRAYS DE SOLO UN LIBRO EN PARTICULAR
    ! SI NECESITA EL OBJETO DE VARIOS LIBROS, SE DEBE USAR EL METODO bookObjectComplex
*/

/**
 * 
 * @param {object} data - objeto de un solo libro
 * @returns 
 */
// function bookObject({ data }) {
//     let object = {}

//     const [info] = data.map(book => {
//         return {
//             id: book.LibroID,
//             title: book.Titulo,
//             author: book.Autor,
//             isbn: book.ISBN,
//             year: book.FechaLanzamiento.getFullYear(),
//             pages: book.CantidadPaginas,
//             publisher: book.Editorial,
//             synopsis: book.Sinopsis,
//             image: book.imagen,
//             pdfLink: book.pdf_link,
//             language: book.Idioma,
//             state: book.Estado,
//             visits: book.Visitas,
//             likes: book.Gustados
//         }
//     })

//     const genres = data.map(book => { return { id: book.CategoriaID, name: book.NombreCategoria } })

//     object = info
//     object.genres = genres

//     return object
// }

export default BookModel