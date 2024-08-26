import BookModel from "../models/book.model.js";

import { responseMessage } from "../utils/error.js";

class BookController {
    static async getAll(req, res) {
        const { title } = req.query

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

        try {
            const books = await BookModel.getAll()
            res.status(200).json(books)
        } catch(err) {
            res.status(404).json(err)
            console.error(err)
        }
    }

    static async getById(req, res) {
        const { id } = req.params

        try {
            const [book] = await BookModel.getById({ id })
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
        const { id } = req.params

        try {
            await BookModel.deleteById({ id })
            res.status(200).json({ message: 'deleted' })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }
}

export default BookController
