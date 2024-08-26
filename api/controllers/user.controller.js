// Modelo del usuario
import UserModel from "../models/user.model.js";

class UserController {
    static async createUser(req, res) {
        const { username, password, email } = req.body

        try {
            const response = await UserModel.createUser({ username, password, email })
            
            if(response == 'email_used')
                return res.status(404).json({ message: 'this email is already used' })
            
            res.status(200).json({ message: 'created' })
        } catch(err) {
            res.status(404).json(err)
        }
    }

    static async getFavorites(req, res) {
        const { userId } = req.body

        try {
            const [books] = await UserModel.getFavorites({ userId })
            res.status(200).json(books)
        } catch(err) {
            res.status(404).json(err)
            console.error(err)
        }
    }

    static async getLikes(req, res) {
        const { userId } = req.body

        try {
            const [books] = await UserModel.getLikes({ userId })
            res.status(200).json(books)
        } catch(err) {
            res.status(404).json(err)
            console.error(err)
        }
    }

    static async getLater(req, res) {
        const { userId } = req.body

        try {
            const [books] = await UserModel.getLater({ userId })
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
                return res.status(404).json({ message: 'duplicated' })

            res.status(200).json({ message: 'added' })
        } catch(err) {
            res.status(404).json(err)
        }
    }

    static async addLike(req, res) {
        const { userId, bookId } = req.body

        try {
            const response = await UserModel.addLike({ userId, bookId })
            if(response == 'duplicated')
                return res.status(404).json({ message: 'duplicated' })

            res.status(200).json({ message: 'added' })
        } catch(err) {
            res.status(404).json(err)
        }
    }

    static async addSeeLater(req, res) {
        const { userId, bookId } = req.body

        try {
            const response = await UserModel.addSeeLater({ userId, bookId })
            if(response == 'duplicated')
                return res.status(404).json({ message: 'duplicated' })

            res.status(200).json({ message: 'added' })
        } catch(err) {
            res.status(404).json(err)
        }
    }

    static async deleteFavorite(req, res) {
        const { userId, bookId } = req.body

        try {
            const response = await UserModel.deleteFavorite({ userId, bookId })

            res.status(200).json({ message: 'deleted' })
        } catch(err) {
            res.status(404).json(err)
        }
    }

    static async deleteLike(req, res) {
        const { userId, bookId } = req.body

        try {
            const response = await UserModel.deleteLike({ userId, bookId })

            res.status(200).json({ message: 'deleted' })
        } catch(err) {
            res.status(404).json(err)
        }
    }

    static async deleteSeeLater(req, res) {
        const { userId, bookId } = req.body

        try {
            const response = await UserModel.deleteSeeLater({ userId, bookId })

            res.status(200).json({ message: 'deleted' })
        } catch(err) {
            res.status(404).json(err)
        }
    }
}

export default UserController