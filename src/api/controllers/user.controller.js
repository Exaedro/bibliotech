// Modelo del usuario
import UserModel from "../models/user.model.js";

class UserController {
    static async getAll(req, res) {
        try {
            const users = await UserModel.getAll()
            res.status(200).json(users)
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async createUser(req, res) {
        const { username, password, email, image, role } = req.body

        try {
            const response = await UserModel.createUser({ username, password, email, image, role })
            
            if(response == 'username_used')
                return res.status(404).json({ message: 'this username is already used', error: response })

            if(response == 'email_used')
                return res.status(404).json({ message: 'this email is already used', error: response })
            
            res.status(200).json({ message: 'created' })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        try {
            const response = await UserModel.LogUser({ email, password })

            if(response == 'user_not_exist') 
                return res.status(404).json({ message: 'this user not exists', error: response })

            if(response == 'invalid_password')
                return res.status(404).json({ message: 'incorrect password', error: response })

            res.status(200).json(response)
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async editUser(req, res) {
        const { userId, username, email, password } = req.body
        let { role, avatar } = req.body

        if(!role)
            role = ''
        if(!avatar)
            avatar = ''

        try {
            const response = await UserModel.editUser({ userId, username, email, password, role, avatar })

            if(response == 'user_not_exist')
                return res.status(404).json({ message: 'this user not exists', error: response })

            res.status(200).json({ message: 'edited', data: { ... req.body } })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async deleteUser(req, res) {
        const { userId } = req.body

        try {
            const response = await UserModel.deleteUser({ userId })

            if(response == 'user_not_exist')
                return res.status(404).json({ message: 'this user not exists', error: response })

            res.status(200).json({ message: 'deleted' })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async validPassword(req, res) {
        const { userId, password } = req.body

        try {
            const response = await UserModel.validPassword({ userId, password })

            if(response == 'user_not_exist')
                return res.status(404).json({ message: 'this user not exists', error: response })

            res.status(200).json(response)
        } catch(err) {
            console.error(err)
            res.status(404).json()
        }
    }

    static async getUserById(req, res) {
        const { userId } = req.params

        try {
            const [response] = await UserModel.getUserById({ userId })
            if(!response)
                return res.status(404).json({ message: 'this user not exists', error: 'user_not_exists' })

            res.status(200).json(response)
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async getUserRecord(req, res) {
        const { userId } = req.params

        try {
            const response = await UserModel.getUserRecord({ userId })

            res.status(200).json(response)
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async addRecord(req, res) {
        const { userId, bookId } = req.body

        try {
            const response = await UserModel.addRecord({ userId, bookId })

            if(response == 'duplicated')
                return res.status(404).json({ message: 'this book is already in this list', error: response })

            res.status(200).json({ message: 'added' })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async getFavorites(req, res) {
        const { userId } = req.query

        try {
            const books = await UserModel.getFavorites({ userId })
            res.status(200).json(books)
        } catch(err) {
            res.status(404).json(err)
            console.error(err)
        }
    }

    static async getLikes(req, res) {
        const { userId } = req.query

        try {
            const books = await UserModel.getLikes({ userId })
            res.status(200).json(books)
        } catch(err) {
            res.status(404).json(err)
            console.error(err)
        }
    }

    static async getLater(req, res) {
        const { userId } = req.query

        try {
            const books = await UserModel.getLater({ userId })
            res.status(200).json(books)
        } catch(err) {
            res.status(404).json(err)
            console.error(err)
        }
    }

    static async addFavorite(req, res) {
        const { userId, bookId } = req.body

        try {
            const response = await UserModel.addFavorite({ userId, bookId })
            if(response == 'duplicated')
                return res.status(404).json({ message: 'duplicated', error: response })

            res.status(200).json({ message: 'added' })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async addLike(req, res) {
        const { userId, bookId } = req.body

        try {
            const response = await UserModel.addLike({ userId, bookId })

            if(response == 'duplicated')
                return res.status(404).json({ message: 'this book is already in this list', error: response })

            res.status(200).json({ message: 'added' })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async addSeeLater(req, res) {
        const { userId, bookId } = req.body

        try {
            const response = await UserModel.addSeeLater({ userId, bookId })

            if(response == 'duplicated')
                return res.status(404).json({ message: 'this book is already added', error: response })

            res.status(200).json({ message: 'added' })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async deleteFavorite(req, res) {
        const { userId, bookId } = req.body

        try {
            const response = await UserModel.deleteFavorite({ userId, bookId })

            res.status(200).json({ message: 'deleted' })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async deleteLike(req, res) {
        const { userId, bookId } = req.body

        try {
            const response = await UserModel.deleteLike({ userId, bookId })

            res.status(200).json({ message: 'deleted' })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }

    static async deleteSeeLater(req, res) {
        const { userId, bookId } = req.body

        try {
            const response = await UserModel.deleteSeeLater({ userId, bookId })

            res.status(200).json({ message: 'deleted' })
        } catch(err) {
            console.error(err)
            res.status(404).json(err)
        }
    }
}

export default UserController