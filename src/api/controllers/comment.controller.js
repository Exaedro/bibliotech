import { ClientError } from "../utils/error.js"

class CommentController {
    constructor({ commentModel }) {
        this.commentModel = commentModel
    }

    getComments = async (req, res, next) => {
        const { bookTitle, bookId } = req.query

        try {
            const comments = await this.commentModel.getComments({ bookTitle, bookId })
            res.status(200).json(comments)
        } catch(err) {
            next(err)
        }
    }

    createComment = async (req, res, next) => {
        const { userId, bookId, comment } = req.body
        
        try {
            const commentCreated = await this.commentModel.createComment({ userId, bookId, comment })
            res.status(200).json({ message: 'created', commentCreated })
        } catch(err) {
            next(err)
        }
    }

    deleteCommentById = async (req, res, next) => {
        const { commentId } = req.body

        try {
            await this.commentModel.deleteCommentById({ id: commentId })
            res.status(200).json({ message: 'deleted' })
        } catch(err) {
            next(err)
        }
    }
}

export default CommentController