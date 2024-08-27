// Botones para eliminar libros de las listas
const buttonsDelete = document.querySelectorAll('.borrar')

// Contenedor para saber que tipo de lista es
const booksContainer = document.getElementById('libros')

// URL de la API de la biblioteca
const API_URL = 'http://localhost:3000/api/v1'

buttonsDelete.forEach(button => {
    button.addEventListener('click', async (elem) => {
        const userId = document.documentElement.getAttribute('data-userId')
        const bookId = elem.target.getAttribute('data-bookId')
        const bookType = booksContainer.getAttribute('data-bookType')

        const response = await fetch(`${API_URL}/user/${bookType}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ userId, bookId })
        })

        if(response.ok)
            return location.reload()
    })
})