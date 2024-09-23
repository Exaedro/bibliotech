export const bookObject = ({ data }) => {
    if (!data || data.length === 0) return null

    let booksArray = []
    let temporalGenres = []
    let bookRepeat
    let bookActual

    for (let i = 0; i < data.length; i++) {
        let book = data[i]

        const bookInfo = {
            id: book.LibroID,
            title: book.Titulo,
            author: book.Autor || book.UsuarioID,
            isbn: book.ISBN,
            date: book.FechaLanzamiento,
            pages: book.CantidadPaginas,
            publisher: book.Editorial,
            synopsis: book.Sinopsis,
            image: book.imagen,
            pdf: book.pdf_link,
            language: book.Idioma,
            state: book.Estado,
            visits: book.Visitas,
            likes: book.Gustados,
            type: book.Tipo,
            original: book.Original
        }

        if (bookInfo.id != bookActual) {
            bookActual = bookInfo.id
            bookRepeat = true
        }

        temporalGenres.push({ id: book.CategoriaID, name: book.NombreCategoria })
        bookInfo.genres = temporalGenres

        if (data[i + 1]?.LibroID != bookInfo.id) {
            booksArray.push(bookInfo)

            bookActual = null
            bookRepeat = false
            temporalGenres = []
        }
    }

    return booksArray
}

export const mangaObject = ({ data }) => {
    if (!data || data.length === 0) return null

    let booksArray = []
    let temporalGenres = []
    let bookRepeat
    let bookActual

    for (let i = 0; i < data.length; i++) {
        let book = data[i]

        const bookInfo = {
            id: book.MangaID,
            title: book.Titulo,
            date: book.FechaLanzamiento,
            synopsis: book.Sinopsis,
            image: book.Imagen,
            type: book.Tipo,
        }

        if (bookInfo.id != bookActual) {
            bookActual = bookInfo.id
            bookRepeat = true
        }

        temporalGenres.push({ id: book.CategoriaID, name: book.NombreCategoria })
        bookInfo.genres = temporalGenres

        if (data[i + 1]?.MangaID != bookInfo.id) {
            booksArray.push(bookInfo)

            bookActual = null
            bookRepeat = false
            temporalGenres = []
        }
    }

    return booksArray
}