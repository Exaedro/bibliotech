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
            author: book.Autor,
            isbn: book.ISBN,
            date: book.FechaLanzamiento,
            page: book.CantidadPaginas,
            publisher: book.Editorial,
            synopsis: book.Sinopsis,
            image: book.imagen,
            pdf: book.pdf_link,
            language: book.Idioma,
            state: book.Estado,
            visits: book.Visitas,
            likes: book.Gustados,
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