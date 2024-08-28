import BookModel from "../models/book.model.js";

import { responseMessage } from "../utils/error.js";

class BookController {
    static async search(req, res) {
        const { title, author, date } = req.query

        try {
            const books = await BookModel.search({ title, author, date })
            res.status(200).json(books)
        } catch(err) {
            res.status(404).json(err)
            console.error(err)
        }
    }

    static async getAll(req, res) {
        const { title, genre } = req.query

        if(title) {
            try {
                const books = await BookModel.getByTitle({ title })
                res.status(200).json(books)
            } catch(err) {
                res.status(404).json(err)
                console.error(err)
            }

            return
        }

        if(genre) {
            try {
                const books = await BookModel.getAllByGenreId({ genre })
                res.status(200).json(books)
            } catch(err) {
                res.status(404).json(err)
                console.error(err)
            }

            return
        }

        try {
            const books = await BookModel.getAll()
            res.status(200).json(books)
        } catch(err) {
            res.status(404).json(err)
            console.error(err)
        }
    }

    static async getCategories(req, res) {
        try {
            const categories = await BookModel.getCategories()
            res.status(200).json(categories)
        } catch(err) {
            res.status(404).json(err)
            console.error(err)
        }
    }

    static async createBook(req, res) {
        const { title, author, isbn, date, pages, language, publisher, synopsis, image, pdfLink, state, categories } = req.body

        if(!title || !author || !isbn || !date || !pages || !language || !publisher || !synopsis || !image || !pdfLink || !state || !categories)
            return res.status(404).json({ message: 'invalid fields', error: 'required_fields' })

        try {
            await BookModel.createBook({ title, author, isbn, date, pages, language, publisher, synopsis, image, pdfLink, state, categories })
            res.status(200).json({ message: 'created' })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async getRecent(req, res) {
        let { limit } = req.query

        if(!limit) limit = 8

        try {
            const books = await BookModel.getRecent({ limit })
            res.status(200).json(books)
        } catch(err) {
            res.status(404).json(err)
            console.error(err)
        }
    }

    static async getMostLiked(req, res) {
        let { limit } = req.query

        if(!limit) limit = 4

        try {
            const books = await BookModel.getMostLiked({ limit })
            res.status(200).json(books)
        } catch(err) {
            res.status(404).json(err)
            console.error(err)
        }
    }

    static async getMostVisited(req, res) {
        let { limit } = req.query

        if(!limit) limit = 6

        try {
            const books = await BookModel.getMostVisited({ limit })
            res.status(200).json(books)
        } catch(err) {
            res.status(404).json(err)
            console.error(err)
        }
    }

    static async getById(req, res) {
        const { id } = req.params

        try {
            const book = await BookModel.getById({ id })
            res.status(200).json(book)
        } catch(err) {
            res.status(404).json(err)
            console.error(err)
        }
    }

    static async getByTitle(req, res) {
        const { title } = req.query

        try {
            const books = await BookModel.getByTitle({ title })
            res.status(200).json(books)
        } catch(err) {
            res.status(404).json(err)
            console.error(err)
        }
    }

    static async editById(req, res) {
        const { id } = req.params
        const { title, author, isbn, pages, language, state, synopsis } = req.body
        const file = req.file

        try {
            await BookModel.editById({ id, title, author, isbn, pages, language, state, synopsis, file })
            res.status(200).json({ message: 'edited' })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async deleteById(req, res) {
        const { userId } = req.body

        try {
            await BookModel.deleteById({ userId })
            res.status(200).json({ message: 'deleted' })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }
}

export default BookController
