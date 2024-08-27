export const isLogged = (req, res, next) => {
    const { username } = req.session

    if(!username)
        return res.redirect('/login')

    next()
}