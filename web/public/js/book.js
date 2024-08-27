// Botones de las acciones
const botonVerLuego = document.getElementById('espera')
const botonMeGusta = document.getElementById('gustado')
const botonFavorito = document.getElementById('favorito')

// Boton y contenedor para agregar los comentarios
const botonEnviarComentario = document.getElementById('enviarComentario')
const divComentario = document.getElementById('comentario')
const comentario = document.getElementById('texto')

// Botones para eliminar los comentarios
const botonesBorrar = document.querySelectorAll('.comentarios .borrar')

// Componente HTML para notificaciones
const notificacion = document.getElementById('notificacion')
const notificacionMensaje = document.querySelector('.notificacion p')
const notificacionIcon = document.querySelector('.notificacion i')

// URL de la API de la biblioteca
const API_URL = 'http://localhost:3000/api/v1'

// Enviar comentarios
botonEnviarComentario.addEventListener('click', async (elem) => {
    await BookActions.commentBook()
})

// Eliminar comentarios
botonesBorrar.forEach(boton => {
    boton.addEventListener('click', async (elem) => {
        const commentId = elem.target.getAttribute('data-commentId')

        await BookActions.deleteComment({ commentId })
    })
})

// Acciones para añadir a las listas (favoritos, gustados y leer luego)
botonVerLuego.addEventListener('click', async (elem) => {
    await BookActions.addToList({ list: 'later', spanish: 'leer luego' })
})
botonMeGusta.addEventListener('click', async (elem) => {
    await BookActions.addToList({ list: 'like', spanish: 'gustados' })
})
botonFavorito.addEventListener('click', async (elem) => {
    await BookActions.addToList({ list: 'favorite', spanish: 'favoritos' })
})

// Clase con todas las funciones necesarias
class BookActions {
    static async deleteComment({ commentId }) {
        const response = await fetch(API_URL + '/comment/delete', {
            method: 'POST', 
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ commentId })
        })

        if(response.ok)
            return location.reload()

        return this.notification({ color: 'red', icon: 'x', message: 'Ocurrio un error al intentar eliminar el comentario.' })
    }

    static async commentBook() {
        const bookId = document.documentElement.getAttribute('data-bookId')
        const userId = document.documentElement.getAttribute('data-userId')
        const comment = comentario.value

        if(userId == '')
            return this.userNotLogged()

        if(comment == '') {
            comentario.style.borderColor = 'red'
            return
        }

        const response = await fetch(API_URL + `/comment/create`, { 
            method: 'POST', 
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ bookId, userId, comment })
        })

        if(response.ok)
            return location.reload()

        return this.notification({ color: 'red', icon: 'x', message: 'Ocurrio un error al intentar enviar tu comentario.' })
    }

    static async addToList({ list, spanish }) {
        const bookId = document.documentElement.getAttribute('data-bookId')
        const userId = document.documentElement.getAttribute('data-userId')

        if(userId == '')
            return this.userNotLogged()

        const response = await fetch(API_URL + `/user/${list}/add`, { 
            method: 'POST', 
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ bookId, userId })
        })

        const { error } = await response.json()

        if(response.ok)
            return this.bookAdded({ list: spanish })

        if(error == 'duplicated')
            return this.duplicatedError()  
    }

    static duplicatedError() {
        this.notification({ color: 'red', icon: 'x', message: 'El libro ya se encuentra en esta lista.' })
    }

    static bookAdded({ list }) {
        this.notification({ color: 'green', icon: 'check', message: `Libro añadido a tu lista de ${list}.` })
    }

    static userNotLogged() {
        this.notification({ color: 'red', icon: 'arrow-down', message: 'Inicia sesión para poder utilizar esto.' })
    }

    static notification({ color, icon, message }) {
        notificacion.style.display = 'flex'
        notificacion.style.borderTopColor = color
        notificacionIcon.className = 'fa-solid fa-' + icon
        notificacionMensaje.innerHTML = message
    }
}

// Funcion para ocultar la notificacion al darle click
notificacion.addEventListener('click', () => {
    notificacion.style.display = 'none'
})