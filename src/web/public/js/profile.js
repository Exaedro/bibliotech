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

        if (response.ok)
            return location.reload()
    })
})

// Botones para eliminar los historiales
const botonesEliminar = document.querySelectorAll('.historial .eliminar')

botonesEliminar.forEach(boton => {
    boton.addEventListener('click', async (elem) => {
        const recordId = boton.getAttribute('data-recordId')

        const response = await fetch(`http://localhost:3000/api/v1/user/record/delete`,
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: recordId })
            })

        if (response.ok)
            return location.reload()
    })
})

// Boton para borrar todo el historial
const botonBorrarHistorial = document.querySelector('dialog .confirmarEliminar')

botonBorrarHistorial.addEventListener('click', async (elem) => {
    for (let boton of botonesEliminar) {
        const recordId = boton.getAttribute('data-recordId')

        await fetch(`http://localhost:3000/api/v1/user/record/delete`,
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: recordId })
            })
    }

    return location.reload()
})