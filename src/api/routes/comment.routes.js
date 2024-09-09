import { Router } from "express"
const commentRouter = new Router()

// Modelo del comentario
import CommentModel from "../models/comment.model.js"

// Controlador
import CommentController from "../controllers/comment.controller.js"
const commentController = new CommentController({ commentModel: CommentModel })

// Prefix de la api
const prefix = process.env.API_PREFIX

// Rutas
commentRouter.get(`${prefix}/comments`, commentController.getComments)
commentRouter.post(`${prefix}/comment/create`, commentController.createComment)
commentRouter.post(`${prefix}/comment/delete`, commentController.deleteCommentById)
commentRouter.post(`${prefix}/comment/edit`, commentController.editComment)

export default commentRouter