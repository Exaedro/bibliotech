const botonVerLuego = document.getElementById('espera')
const botonMeGusta = document.getElementById('gustado')
const botonFavorito = document.getElementById('favorito')

const notificacion = document.getElementById('notificacion')
const notificacionMensaje = document.querySelector('.notificacion p')
const notificacionIcon = document.querySelector('.notificacion i')

const botonEnviarComentario = document.getElementById('enviarComentario')
const divComentario = document.getElementById('comentario')
const comentario = document.getElementById('texto')

const botonesBorrar = document.querySelectorAll('.comentarios .borrar')

const API_URL = 'http://localhost:3000/api/v1'

botonVerLuego.addEventListener('click', async (elem) => {
    await BookActions.addToList({ list: 'later', spanish: 'leer luego' })
})

botonMeGusta.addEventListener('click', async (elem) => {
    await BookActions.addToList({ list: 'like', spanish: 'gustados' })
})

botonFavorito.addEventListener('click', async (elem) => {
    await BookActions.addToList({ list: 'favorite', spanish: 'favoritos' })
})

class BookActions {
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