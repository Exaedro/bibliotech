// Manejador de errores
import { ClientError } from "../utils/error.js"

class UserController {
    constructor({ userModel }) {
        this.userModel = userModel
    }

    getAll = async (req, res, next) => {
        try {
            const users = await this.userModel.getAll()
            res.status(200).json(users)
        } catch(err) {
            next(err)
        }
    }

    createUser = async (req, res, next) => {
        const { username, password, email, image, role } = req.body

        try {
            if(!username || !password || !email)
                throw new ClientError('missing fields')

            const response = await this.userModel.createUser({ username, password, email, image, role })
            
            if(response == 'username_used')
                throw new ClientError('this username is already used')

            if(response == 'email_used')
                throw new ClientError('this email is already used')
            
            res.status(200).json({ message: 'created', error: false })
        } catch(err) {
            next(err)
        }
    }

    login = async (req, res, next) => {
        const { email, password } = req.body

        try {
            if(!email || !password)
                throw new ClientError('missing fields')

            const response = await this.userModel.login({ email, password })

            if(response == 'user_not_exist') 
                throw new ClientError('this email not exists')

            if(response == 'invalid_password')
                throw new ClientError('incorrect password')

            const user = {
                id: response[0].id,
                username: response[0].username,
                email: response[0].email,
                image: response[0].image,
                role: response[0].role
            }

            res.status(200).json({ ...user, error: false })
        } catch(err) {
            next(err)
        }
    }

    editUser = async (req, res, next) => {
        const { id, username, email, password, role, avatar } = req.body

        try {
            if(!id) {
                throw new ClientError('id is missing')
            } 

            if(isNaN(id)) {
                throw new ClientError('id must be a number')
            }

            const response = await this.userModel.editUser({ id, username, email, password, role, avatar })

            if(response == 'user_not_exist')
                throw new ClientError('this user not exists')

            res.status(200).json({ message: 'edited', data: { ... req.body }, error: false })
        } catch(err) {
            next(err)
        }
    }

    deleteUser = async (req, res, next) => {
        const { id } = req.body

        try {
            if(!id)
                throw new ClientError('id is missing')

            if(isNaN(id)) {
                throw new ClientError('id must be a number')
            }
            
            const response = await this.userModel.deleteUser({ id })

            if(response == 'user_not_exist')
                throw new ClientError('this user not exists')

            res.status(200).json({ message: 'deleted', error: false })
        } catch(err) {
            next(err)
        }
    }

    validPassword = async (req, res, next) => {
        const { userId, password } = req.body

        try {
            if(!userId || !password)
                throw new ClientError('missing fields')

            if(isNaN(userId)) 
                throw new ClientError('userId must be a number')
            
            const response = await this.userModel.validPassword({ userId, password })

            if(response == 'user_not_exist')
                return res.status(404).json({ message: 'this user not exists', error: response })

            res.status(200).json({ ...response, error: false })
        } catch(err) {
            next(err)
        }
    }

    getUserById = async (req, res, next) => {
        const { id } = req.params

        try {
            if(!id)
                throw new ClientError('id is missing')

            if(isNaN(id)) 
                throw new ClientError('id must be a number')

            const [response] = await this.userModel.getUserById({ id })
            if(!response)
                throw new ClientError('this user not exists')

            res.status(200).json({ ...response, error: false})
        } catch(err) {
            next(err)
        }
    }

    getUserRecord = async (req, res, next) => {
        const { id } = req.params

        try {
            if(!id)
                throw new ClientError('id is missing')

            if(isNaN(id)) 
                throw new ClientError('id must be a number')

            const response = await this.userModel.getUserRecord({ id })

            res.status(200).json({ ...response, error: false })
        } catch(err) {
            next(err)
        }
    }

    addRecord = async (req, res, next) => {
        const { userId, bookId } = req.body

        try {
            if(!userId || !bookId)
                throw new ClientError('missing fields')

            if(isNaN(userId) || isNaN(bookId)) 
                throw new ClientError('userId and bookId must be a number')

            const response = await this.userModel.addRecord({ userId, bookId })

            if(response == 'duplicated')
                return res.status(404).json({ message: 'this book is already in this list', error: response })

            res.status(200).json({ message: 'added', error: false })
        } catch(err) {
            next(err)
        }
    }

    getFavorites = async (req, res, next) => {
        const { id } = req.params

        try {
            if(!id)
                throw new ClientError('id is missing')

            if(isNaN(id)) 
                throw new ClientError('id must be a number')
            
            const data = await this.userModel.getFavorites({ id })

            if(data == 'user_not_exists')
                throw new ClientError('this user not exists')

            res.status(200).json({ books: data, error: false })
        } catch(err) {
            next(err)
        }
    }

    getLikes = async (req, res, next) => {
        const { id } = req.params

        try {
            if(!id)
                throw new ClientError('id is missing')

            if(isNaN(id)) 
                throw new ClientError('id must be a number')

            const data = await this.userModel.getLikes({ id })

            if(data == 'user_not_exists')
                throw new ClientError('this user not exists')

            res.status(200).json({ books: data, error: false })
        } catch(err) {
            next(err)
        }
    }

    getLater = async (req, res, next) => {
        const { id } = req.params

        try {
            if(!id)
                throw new ClientError('id is missing')

            if(isNaN(id)) 
                throw new ClientError('id must be a number')

            const data = await this.userModel.getLater({ id })
            
            if(data == 'user_not_exists')
                throw new ClientError('this user not exists')

            res.status(200).json({ books: data, error: false })
        } catch(err) {
            next(err)
        }
    }

    addFavorite = async (req, res, next) => {
        const { userId, bookId } = req.body

        try {
            if(!userId || !bookId)
                throw new ClientError('missing fields')

            if(isNaN(userId) || isNaN(bookId)) 
                throw new ClientError('userId and bookId must be a number')

            const response = await this.userModel.addFavorite({ userId, bookId })
            if(response == 'duplicated')
                throw new ClientError('this book is already added')

            res.status(200).json({ message: 'added', error: false })
        } catch(err) {
            next(err)
        }
    }

    addLike = async (req, res, next) => {
        const { userId, bookId } = req.body

        try {
            if(!userId || !bookId)
                throw new ClientError('missing fields')

            if(isNaN(userId) || isNaN(bookId))  
                throw new ClientError('userId and bookId must be a number')

            const response = await this.userModel.addLike({ userId, bookId })

            if(response == 'duplicated')
                throw new ClientError('this book is already added')

            res.status(200).json({ message: 'added', error: false })
        } catch(err) {
            next(err)
        }
    }

    addSeeLater = async (req, res, next) => {
        const { userId, bookId } = req.body

        try {
            if(!userId || !bookId)
                throw new ClientError('missing fields')

            if(isNaN(userId) || isNaN(bookId)) 
                throw new ClientError('userId and bookId must be a number')

            const response = await this.userModel.addSeeLater({ userId, bookId })

            if(response == 'duplicated')
                throw new ClientError('this book is already added')

            res.status(200).json({ message: 'added', error: false })
        } catch(err) {
            next(err)
        }
    }

    deleteFavorite = async (req, res, next) => {
        const { userId, bookId } = req.body

        try {
            if(!userId || !bookId)
                throw new ClientError('missing fields')

            if(isNaN(userId) || isNaN(bookId)) 
                throw new ClientError('userId and bookId must be a number')

            const response = await this.userModel.deleteFavorite({ userId, bookId })

            res.status(200).json({ message: 'deleted', error: false })
        } catch(err) {  
            next(err)
        }
    }

    deleteLike = async (req, res, next) => {
        const { userId, bookId } = req.body

        try {
            if(!userId || !bookId)
                throw new ClientError('missing fields')

            if(isNaN(userId) || isNaN(bookId))  
                throw new ClientError('userId and bookId must be a number')

            const response = await this.userModel.deleteLike({ userId, bookId })

            res.status(200).json({ message: 'deleted', error: false })
        } catch(err) {
            next(err)
        }
    }

    deleteSeeLater = async (req, res, next) => {
        const { userId, bookId } = req.body

        try {
            if(!userId || !bookId)
                throw new ClientError('missing fields')

            if(isNaN(userId) || isNaN(bookId)) 
                throw new ClientError('userId and bookId must be a number')

            const response = await this.userModel.deleteSeeLater({ userId, bookId })

            res.status(200).json({ message: 'deleted', error: false })
        } catch(err) {
            next(err)
        }
    }
}

export default UserController