// Modelo del comentario
import CommentModel from "../models/comment.model.js"

class CommentController {
    static async getComments(req, res) {
        const { bookTitle, bookId } = req.query

        try {
            const comments = await CommentModel.getComments({ bookTitle, bookId })
            res.status(200).json(comments)
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async createComment(req, res) {
        const { userId, bookId, comment } = req.body
        
        try {
            const commentCreated = await CommentModel.createComment({ userId, bookId, comment })
            res.status(200).json({ message: 'created', commentCreated })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async deleteCommentById(req, res) {
        const { id } = req.params

        try {
            await CommentModel.deleteCommentById({ id })
            res.status(200).json({ message: 'deleted' })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }
}

export default CommentController