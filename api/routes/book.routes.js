import { Router } from "express";
const bookRouter = new Router()

// Controlador
import BookController from "../controllers/book.controller.js";

// Prefix de la api
import config from '../config.json' with { type: 'json' }
const prefix = config["api-prefix"]

// Rutas de los libros
bookRouter.get(`${prefix}/book/all`, (req, res) => { BookController.getAll(req, res) })
bookRouter.get(`${prefix}/book/categories`, (req, res) => { BookController.getCategories(req, res) })

bookRouter.get(`${prefix}/book/recent`, (req, res) => { BookController.getRecent(req, res) })
bookRouter.get(`${prefix}/book/liked`, (req, res) => { BookController.getMostLiked(req, res) })
bookRouter.get(`${prefix}/book/visited`, (req, res) => { BookController.getMostVisited(req, res) })

bookRouter.get(`${prefix}/book/:id`, (req, res) => { BookController.getById(req, res) })

export default bookRouter