import { Router } from "express";
const bookRouter = new Router()

// Modelo de los libros
import BookModel from "../models/book.model.js";

// Controlador
import BookController from "../controllers/book.controller.js";
const bookController = new BookController({ bookModel: BookModel })

// Prefix de la api
const prefix = process.env.API_PREFIX

// Rutas de los libros
bookRouter.get(`${prefix}/books`, bookController.getAll)
bookRouter.get(`${prefix}/book/:id`, bookController.getById)

bookRouter.get(`${prefix}/books/categories`, bookController.getCategories)
bookRouter.get(`${prefix}/books/search`, bookController.search)

bookRouter.get(`${prefix}/books/recent`, bookController.getRecent)
bookRouter.get(`${prefix}/books/liked`, bookController.getMostLiked)
bookRouter.get(`${prefix}/books/visited`, bookController.getMostVisited)

bookRouter.post(`${prefix}/book/create`, bookController.createBook)
bookRouter.post(`${prefix}/book/delete`, bookController.deleteById)
bookRouter.post(`${prefix}/book/:id/edit`, bookController.editById)	

bookRouter.get(`${prefix}/book/:id/visits`, bookController.getVisits)
bookRouter.post(`${prefix}/book/add/visit`, bookController.addVisit)
bookRouter.post(`${prefix}/book/delete/visit`, bookController.deleteVisit)

export default bookRouter