import { Router } from "express";
const userRouter = new Router()

// Controlador
import UserController from "../controllers/user.controller.js";

// Prefix de la api
import config from '../config.json' with { type: 'json' }
const prefix = config["api-prefix"]


// Cors
import { cors } from "../utils/cors.js";

// Rutas
userRouter.get('/*', (req, res, next) => {
    cors(res, 'http://localhost:4000')
    next()
})

userRouter.post(`${prefix}/user/create`, (req, res) => { UserController.createUser(req, res) })
userRouter.post(`${prefix}/user/login`, (req, res) => { UserController.login(req, res) })

userRouter.post(`${prefix}/user/favorite/all`, (req, res) => { UserController.getFavorites(req, res) })
userRouter.post(`${prefix}/user/like/all`, (req, res) => { UserController.getLikes(req, res) })
userRouter.post(`${prefix}/user/later/all`, (req, res) => { UserController.getLater(req, res) })

userRouter.post(`${prefix}/user/favorite/add`, (req, res) => { UserController.addFavorite(req, res) })
userRouter.post(`${prefix}/user/like/add`, (req, res) => { UserController.addLike(req, res) })
userRouter.post(`${prefix}/user/later/add`, (req, res) => { UserController.addSeeLater(req, res) })

userRouter.post(`${prefix}/user/favorite/delete`, (req, res) => { UserController.deleteFavorite(req, res) })
userRouter.post(`${prefix}/user/like/delete`, (req, res) => { UserController.deleteLike(req, res) })
userRouter.post(`${prefix}/user/later/delete`, (req, res) => { UserController.deleteSeeLater(req, res) })


export default userRouter