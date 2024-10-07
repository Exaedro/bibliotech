// Socket.io
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const socket = io();

// Botones de las acciones
const botonVerLuego = document.getElementById('espera')
const botonMeGusta = document.getElementById('gustado')
const botonFavorito = document.getElementById('favorito')

// Boton y contenedor para agregar los comentarios
const botonEnviarComentario = document.getElementById('enviarComentario')
const divComentario = document.getElementById('comentario')
const comentario = document.getElementById('texto')
const comentarioError = document.getElementById('commentError')

// Boton para editar los comentarios
const botonEditar = document.querySelectorAll('.comentarios .editar')
const textoComentarios = document.querySelectorAll('.comentarios .texto')

// Botones para eliminar los comentarios
const modalesComentarios = document.querySelectorAll("dialog");
const botonesEliminar = document.querySelectorAll('.comentarios .borrar')
const botonesBorrar = document.querySelectorAll('dialog .confirmarEliminar')

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

// Crear tooltips
tippy('.original', {
    content: "Esta es una historia original."
});

tippy('.subirCapitulo', {
    content: "Subir un nuevo capítulo",
    placement: 'right'
});

// Funcion para mostrar el editor de comentarios
botonEditar.forEach(boton => {
    boton.addEventListener('click', async (elem) => {
        const commentId = elem.target.getAttribute('data-commentId')

        textoComentarios.forEach(texto => {
            const textoCommentId = texto.getAttribute('data-commentId')
            const textoContent = texto.innerText.replace('(editado)', '')

            if (textoCommentId == commentId) {

                // Crear textarea
                const textarea = document.createElement('textarea')
                textarea.className = 'editarComentarioTextarea'
                textarea.value = textoContent
                

                // Crear div para editar el texto
                const div = document.createElement('div')
                div.className = 'editarComentario'

                // Crear boton para guardar el texto
                const botonGuardar = document.createElement('button')
                botonGuardar.innerText = 'Guardar'
                botonGuardar.className = 'guardarComentario'

                // Crear boton para cancelar el texto
                const botonCancelar = document.createElement('button')
                botonCancelar.innerText = 'Cancelar'
                botonCancelar.className = 'cancelarComentario'

                botonGuardar.addEventListener('click', async (e) => {
                    const texto = e.target.parentNode.parentNode.querySelector('.editarComentarioTextarea')
                    const textValue = texto.value

                    await BookActions.editComment({ commentId, textValue })
                })

                texto.parentNode.replaceChild(textarea, texto)
                textarea.parentNode.appendChild(div)

                div.appendChild(botonGuardar)
                botonGuardar.parentNode.appendChild(botonCancelar, botonGuardar)

                botonCancelar.addEventListener('click', (e) => {
                    e.preventDefault()
                    e.target.parentNode.remove()
                    textarea.parentNode.replaceChild(texto, textarea)
                })
            }
        })
    })
})

// Funcion para confirmacion al eliminar comentarios
botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", (elem) => {
        const modalId = boton.getAttribute("data-modal");

        verificarModal({ botonId: modalId });
    });
});
const verificarModal = ({ botonId }) => {
    modalesComentarios.forEach((modal) => {
        const modalId = modal.getAttribute("data-modal").replace('modal', '');

        if (botonId == modalId) {
            modal.showModal();
        }
    });
};

/**
 * Si el error del formulario de comentarios esta visible,
 * al escribir en el formulario se oculta el error automaticamente
 * de lo contrario seguira el error ahi hasta que el usuario escriba algo
*/
comentario.addEventListener('keydown', (elem) => {
    const isErrorShowed = comentarioError.className

    if (isErrorShowed.includes('show'))
        comentario.style.borderColor = 'var(--color-fondo-secundario)'
    comentarioError.className = 'hidden error'
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

        if (response.ok)
            return location.reload()

        return this.notification({ color: 'red', icon: 'x', message: 'Ocurrio un error al intentar eliminar el comentario.' })
    }

    static async commentBook() {
        const bookId = document.documentElement.getAttribute('data-bookId')
        const userId = document.documentElement.getAttribute('data-userId')
        const comment = comentario.value

        if (userId == '')
            return this.userNotLogged()

        if (comment == '') {
            comentario.style.borderColor = 'red'
            comentarioError.className = 'show error'
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

        if (response.ok)
            return location.reload()

        return this.notification({ color: 'red', icon: 'x', message: 'Ocurrio un error al intentar enviar tu comentario.' })
    }

    static async editComment({ commentId, textValue }) {
        const userId = document.documentElement.getAttribute('data-userId')

        if (userId == '')
            return this.userNotLogged()

        const response = await fetch(API_URL + `/comment/edit`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: commentId, comment: textValue })
        })

        if (response.ok)
            return location.reload()

        return this.notification({ color: 'red', icon: 'x', message: 'Ocurrio un error al intentar editar tu comentario.' })
    }

    static async addToList({ list, spanish }) {
        const bookId = document.documentElement.getAttribute('data-bookId')
        const userId = document.documentElement.getAttribute('data-userId')

        if (userId == '')
            return this.userNotLogged()

        const response = await fetch(API_URL + `/user/${list}/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookId, userId })
        })

        const { message, error } = await response.json()

        if (message.includes('already'))
            return this.duplicatedError()

        if (response.ok) {
            socket.emit('add like', { id: bookId })
            return this.bookAdded({ list: spanish })
        }
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