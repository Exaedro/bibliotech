import { Router } from "express"
const commentRouter = new Router()

// Controlador
import CommentController from "../controllers/comment.controller.js"

// Prefix de la api
import config from '../config.json' with { type: 'json' }
const prefix = config["api-prefix"]

// Rutas
commentRouter.post(`${prefix}/comment/create`, (req, res) => { CommentController.createComment(req, res) })
commentRouter.post(`${prefix}/comment/delete`, (req, res) => { CommentController.deleteCommentById(req, res) })
commentRouter.get(`${prefix}/comment/all`, (req, res) => { CommentController.getComments(req, res) })

export default commentRouter