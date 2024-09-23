// Base de datos
import db from "../database.js";

import { bookObject, mangaObject } from "../utils/bookObject.js";

class BookModel {
    /**
     * 
     * @param {string} title - titulo del libro
     * @param {string} author - autor del libro
     * @param {string} date - fecha de lanzamiento del libro
     * @param {string} genre - categoria del libro
     */
    static async search({ title, author, date, genre, isbn, pages, language, publisher, page }) {
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
        const totalBooks = await this.getTotalBooks({ books })

        const data = books.map(book => { return { id: book.LibroID, title: book.Titulo, image: book.imagen } })
        
        const object = {
            data: {
                totalBooks
            },
            books: data,
        }

        return object
    }

    static async getAll({ page } = {}) {
        let sql = `SELECT * FROM libros`
        if(page) {
            const offset = page * 10
            sql = `SELECT * FROM libros LIMIT 10 OFFSET ${offset}`
        }

        const [books] = await db.query(sql)
        const totalBooks = await this.getTotalBooks()

        const data = await bookObjectComplex({ data: books })

        const object = {
            data: {
                totalBooks
            },
            books: data,
        }
    
        return object
    }

    static async getTotalBooks({ books } = {}) {
        if(books) {
            const [searchBooks] = await db.query(`SELECT COUNT(*) as total FROM libros`)
            const total = searchBooks[0].total
            return total
        }

        const [totalBooks] = await db.query(`SELECT COUNT(*) as total FROM libros`)
        const total = totalBooks[0].total
        return total
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
        const [books] = await db.query(`SELECT * FROM libros ORDER BY Visitas DESC LIMIT ${limit}`)

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
        // Si el usuario ingreso una portada se le agrega a la consulta el campo "imagen"
        let sql = `UPDATE libros SET Titulo = '${title}', Autor = '${author}', Editorial = '${publisher}', FechaLanzamiento = '${date}', ISBN = '${isbn}', CantidadPaginas = '${pages}', Idioma = '${language}', Estado = '${state}', Sinopsis = '${synopsis}' WHERE LibroID = ${id};`
        if(file) sql = `UPDATE libros SET Titulo = '${title}', Autor = '${author}', Editorial = '${publisher}', FechaLanzamiento = '${date}', ISBN = '${isbn}', CantidadPaginas = '${pages}', Idioma = '${language}', Estado = '${state}', Sinopsis = '${synopsis}', imagen = '${file}' WHERE LibroID = ${id};`

        if(typeof categories == 'object' && categories.length > 0) {
            // Eliminar todas los generos que tenia antes el libro
            await db.query('DELETE FROM libros_categorias WHERE LibroID = ?', [id])
            
            // Insertar los nuevos generos
            categories.forEach(async categorie => {
                await db.query('INSERT INTO libros_categorias (LibroID, CategoriaID) VALUES (?, ?)', [id, categorie])
            })
        }

        // Si el usuario ingreso solo una categoria
        if(typeof categories == 'string') {
            await db.query('DELETE FROM libros_categorias WHERE LibroID = ?', [id])
            await db.query('INSERT INTO libros_categorias (LibroID, CategoriaID) VALUES (?, ?)', [id, categories])
        }

        await db.query(sql)
    }

    /**
     * 
     * @param {integer} bookId - id del libro 
     */
    static async deleteById({ bookId }) {

        await db.query(`DELETE FROM libros WHERE LibroID = '${bookId}'`)
    }

    static async getVisits({ id }) {
        const [data] = await db.query(`SELECT Visitas FROM libros WHERE LibroID = ?`, [id])
        const visits = data[0].Visitas
        
        return visits
    }

    static async addVisit({ id }) {
        await db.query(`UPDATE libros SET Visitas = Visitas + 1 WHERE LibroID = ?`, [id])
    }

    static async deleteVisit({ id }) {
        await db.query(`UPDATE libros SET Visitas = Visitas - 1 WHERE LibroID = ?`, [id])
    }

    static async getMangas() {
        const [mangas] = await db.query(`SELECT * FROM mangas m JOIN mangas_categorias mc ON m.MangaID = mc.MangaID JOIN categorias c ON mc.CategoriaID = c.CategoriaID`)

        const data = mangaObject({ data: mangas })

        return data
    }

    /**
     * 
     * @param {integer} id - id del manga
     */
    static async getMangaById({ id }) {
        const [manga] = await db.query(`SELECT * FROM mangas m JOIN mangas_categorias mc ON m.MangaID = mc.MangaID JOIN categorias c ON mc.CategoriaID = c.CategoriaID WHERE m.MangaID = ?`, [id])
        
        const data = mangaObject({ data: manga })

        return data
    }

    /**
     * 
     * @param {string} title - titulo del manga
     * @param {string} type - tipo del manga
     * @param {string} synopsis - sinopsis del manga
     * @param {string} image - imagen del manga
     * @param {array} categories - array de categorias del manga
     */
    static async uploadManga({ title, type, synopsis, image, categories }) {
        await db.query(`INSERT INTO libros (Titulo, Tipo, Sinopsis, imagen, Original) VALUES (?, ?, ?, ?, ?)`, [title, type, synopsis, image, true])

        const [mangaId] = await db.query(`SELECT LibroID FROM libros WHERE Titulo = ?`, [title])

        for(let category of categories) {
            await db.query('INSERT INTO libros_categorias (LibroID, CategoriaID) VALUES (?, ?)', [mangaId[0].LibroID, category])
        }
        
        const [manga] = await db.query(`SELECT * FROM libros l JOIN libros_categorias lc ON l.LibroID = lc.LibroID JOIN categorias c ON lc.CategoriaID = c.CategoriaID WHERE l.LibroID = ?`, [mangaId[0].LibroID])

        const data = bookObject({ data: manga })

        return data
    }

    /**
     * 
     * @param {integer} id - id del manga
     * @param {integer} chapterNumber - numero del capitulo
     * @param {string} chapterTitle - titulo del capitulo
     */
    static async addChapter({ id, chapterNumber, chapterTitle }) {
        await db.query(`INSERT INTO mangas_capitulos (MangaID, CapituloNumero, CapituloNombre) VALUES (?, ?, ?)`, [id, chapterNumber, chapterTitle])
    }

    /**
     * 
     * @param {integer} id - id del manga
     * @param {integer} chapterId - id del capitulo
     * @param {array} images - array de imagenes del manga
     */
    static async uploadImages({ id, chapterId, images }) {
        for(let image of images) {
            const imagePath = `/uploads/${image.filename}`
        
            await db.query(`INSERT INTO mangas_imagenes (MangaID, CapituloID, Imagen) VALUES (?, ?, ?)`, [id, chapterId, imagePath])
        }
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