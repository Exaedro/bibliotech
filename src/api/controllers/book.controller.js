import { ClientError } from "../utils/error.js"

class BookController {
    constructor({ bookModel }) {
        this.bookModel = bookModel
    }

    getAll = async (req, res, next) => {
        const { page } = req.query

        try {
            const books = await this.bookModel.getAll({ page })
            res.status(200).json(books)
        } catch(err) {
            console.error(err)
            res.status(404)
        }
    }

    search = async (req, res, next) => {
        const { title, author, date, genre, isbn, pages, language, publisher, page } = req.query

        try {
            const books = await this.bookModel.search({ title, author, date, genre, isbn, pages, language, publisher, page })
            res.status(200).json(books)
        } catch(err) {
            next(err)
        }
    }

    getRecent = async (req, res, next) => {  
        let { limit = 8 } = req.query

        try {
            if(isNaN(limit)) 
                throw new ClientError('limit must be a number')

            const books = await this.bookModel.getRecent({ limit })
            res.status(200).json(books)
        } catch(err) {
            next(err)
        }
    }

    getMostLiked = async (req, res, next) => {
        let { limit = 4 } = req.query

        try {
            if(isNaN(limit)) 
                throw new ClientError('limit must be a number')

            const books = await this.bookModel.getMostLiked({ limit })
            res.status(200).json(books)
        } catch(err) {
            next(err)
        }
    }

    getMostVisited = async (req, res, next) => {
        let { limit = 6 } = req.query

        try {
            if(isNaN(limit)) 
                throw new ClientError('limit must be a number')

            const books = await this.bookModel.getMostVisited({ limit })
            res.status(200).json(books)
        } catch(err) {
            next(err)
        }
    }

    getCategories = async (req, res, next) => {
        try {
            const categories = await this.bookModel.getCategories()
            res.status(200).json(categories)
        } catch(err) {
            next(err)
        }
    }

    createBook = async (req, res, next) => {
        const { title, author, isbn, date, pages, language, publisher, synopsis, image, pdfLink, state, categories } = req.body        
        try {
            if(!title || !author || !isbn || !date || !pages || !language || !publisher || !synopsis || !image || !pdfLink || !state || !categories)
                throw new ClientError('missing fields')

            await this.bookModel.createBook({ title, author, isbn, date, pages, language, publisher, synopsis, image, pdfLink, state, categories })
            res.status(200).json({ message: 'created' })
        } catch(err) {
            next(err)
        }
    }

    getById = async (req, res, next) => {
        const { id } = req.params

        try {
            if(isNaN(id)) 
                throw new ClientError('id must be a number')

            const book = await this.bookModel.getById({ id })
            if(!book) throw new ClientError('book not found', 404)

            res.status(200).json(book)
        } catch(err) {
            next(err)
        }
    }

    editById = async (req, res, next) => {
        const { id } = req.params
        const { title, author, date, isbn, publisher, pages, language, state, synopsis, categories, file } = req.body

        try {
            if(isNaN(id)) 
                throw new ClientError('id must be a number')

            await this.bookModel.editById({ id, title, author, date, isbn, publisher, pages, language, state, categories, synopsis, file })
            res.status(200).json({ message: 'edited' })
        } catch(err) {
            console.log(err)
        }
    }

    deleteById = async (req, res, next) => {
        const { bookId } = req.body

        try {
            if(isNaN(bookId)) 
                throw new ClientError('id must be a number')

            await this.bookModel.deleteById({ bookId })
            res.status(200).json({ message: 'deleted' })
        } catch(err) {
            next(err)
        }
    }

    getVisits = async (req, res, next) => {
        const { id } = req.params

        try {
            if(isNaN(id)) 
                throw new ClientError('id must be a number')

            const visits = await this.bookModel.getVisits({ id })
            res.status(200).json({ visits })
        } catch(err) {
            next(err)
        }
    }

    addVisit = async (req, res, next) => {
        const { id, ip } = req.body

        try {
            if(isNaN(id)) 
                throw new ClientError('id must be a number')

            await this.bookModel.addVisit({ id, ip })
            res.status(200).json({ message: 'added' })
        } catch(err) {
            next(err)
        }
    }

    deleteVisit = async (req, res, next) => {
        const { id } = req.body

        try {
            if(isNaN(id)) 
                throw new ClientError('id must be a number')

            await this.bookModel.deleteVisit({ id })
            res.status(200).json({ message: 'deleted' })
        } catch(err) {
            next(err)
        }
    }

    // ! METODO QUE PUEDE SER ELIMINADO MAS TARDE
    getByTitle = async (req, res, next) => {
        const { title } = req.query

        try {
            const books = await BookModel.getByTitle({ title })
            res.status(200).json(books)
        } catch(err) {
            next(err)
        }
    }

    getMangas = async (req, res, next) => {
        try {
            const mangas = await this.bookModel.getMangas()
            res.status(200).json(mangas)
        } catch(err) {
            next(err)
        }
    }

    getMangaById = async (req, res, next) => {
        const { id } = req.params

        try {
            const manga = await this.bookModel.getMangaById({ id })
            res.status(200).json(manga)
        } catch(err) {
            next(err)
        }
    }

    /**
     * !
     * ! AGREGAR VALIDACIONES A TODO MAS TARDE
     * !
     */

    uploadManga = async (req, res, next) => {
        const { title, type, synopsis, image, categories, userId } = req.body

        try {
            const manga = await this.bookModel.uploadManga({ title, type, synopsis, image, categories, userId })
            res.status(200).json({ message: 'added', manga })
        } catch(err) {
            console.error(err)
        }
    }

    getMangaChapters = async (req, res, next) => {
        const { id } = req.params

        try {
            const chapters = await this.bookModel.getMangaChapters({ id })
            res.status(200).json(chapters)
        } catch(err) {
            next(err)
        }
    }

    getChapter = async (req, res, next) => {
        const { id, chapterId } = req.params

        try {
            const chapter = await this.bookModel.getChapter({ id, chapterId })
            res.status(200).json(chapter)
        } catch(err) {
            console.log(err)
        }
    }

    addChapter = async (req, res, next) => {
        const { id, chapterNumber, chapterTitle } = req.body

        try {
            const chapterId = await this.bookModel.addChapter({ id, chapterNumber, chapterTitle })
            res.status(200).json({ message: 'added', chapterId })
        } catch(err) {
            console.log(err)
        }
    }

    uploadImages = async (req, res, next) => {
        const { id, chapterId, images } = req.body
        
        try {
            await this.bookModel.uploadImages({ id, chapterId, images })
            res.status(200).json({ message: 'uploaded' })
        } catch(err) {
            console.log(err)
        }
    }
}

export default BookController
