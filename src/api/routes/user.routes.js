import { Router } from "express";
const userRouter = new Router()

// Controlador
import UserController from "../controllers/user.controller.js";

// Prefix de la api
const prefix = process.env.API_PREFIX

// Rutas
userRouter.get(`${prefix}/user/all`, (req, res) => { UserController.getAll(req, res) })
userRouter.get(`${prefix}/user/data/:userId`, (req, res) => { UserController.getUserById(req, res) })
userRouter.get(`${prefix}/user/record/:userId`, (req, res) => { UserController.getUserRecord(req, res) })

userRouter.post(`${prefix}/user/create`, (req, res) => { UserController.createUser(req, res) })
userRouter.post(`${prefix}/user/delete`, (req, res) => { UserController.deleteUser(req, res) })
userRouter.post(`${prefix}/user/password`, (req, res) => { UserController.validPassword(req, res) })
userRouter.post(`${prefix}/user/login`, (req, res) => { UserController.login(req, res) })
userRouter.post(`${prefix}/user/edit`, (req, res) => { UserController.editUser(req, res) })
userRouter.post(`${prefix}/user/record/add`, (req, res) => { UserController.addRecord(req, res) })

userRouter.get(`${prefix}/user/favorite/all`, (req, res) => { UserController.getFavorites(req, res) })
userRouter.get(`${prefix}/user/like/all`, (req, res) => { UserController.getLikes(req, res) })
userRouter.get(`${prefix}/user/later/all`, (req, res) => { UserController.getLater(req, res) })

userRouter.post(`${prefix}/user/favorite/add`, (req, res) => { UserController.addFavorite(req, res) })
userRouter.post(`${prefix}/user/like/add`, (req, res) => { UserController.addLike(req, res) })
userRouter.post(`${prefix}/user/later/add`, (req, res) => { UserController.addSeeLater(req, res) })

userRouter.post(`${prefix}/user/favorite/delete`, (req, res) => { UserController.deleteFavorite(req, res) })
userRouter.post(`${prefix}/user/like/delete`, (req, res) => { UserController.deleteLike(req, res) })
userRouter.post(`${prefix}/user/later/delete`, (req, res) => { UserController.deleteSeeLater(req, res) })


export default userRouter