export const isLogged = (req, res, next) => {
    const { username } = req.session

    if(!username)
        return res.redirect('/login')

    next()
}

export const isAdmin = (req, res, next) => {
    const { role } = req.session

    if(role != 'admin')
        return res.redirect('/login')

    next()
}