export const isLogged = (req, res, next) => {
    const { username, role } = req.session

    if(!username)
        return res.redirect('/login')

    next()
}

export const isAdmin = (req, res, next) => {
    const { role } = req.session

    if(!role)
        return res.redirect('/login')

    if(role != 'admin')
        return res.redirect('/error?message=forbidden')

    next()
}

export const isAuthor = (req, res, next) => {
    const { autor } = req.session

    if(!autor)
        return res.redirect('/login')

    next()
}