const botonVerLuego = document.getElementById('espera')
const botonMeGusta = document.getElementById('gustado')
const botonSeguido = document.getElementById('seguido')

const notificacion = document.getElementById('notificacion')
const notificacionMensaje = document.querySelector('.notificacion p')
const notificacionIcon = document.querySelector('.notificacion i')

const botonEnviarComentario = document.getElementById('enviarComentario')
const divComentario = document.getElementById('comentario')
const comentario = document.getElementById('texto')

const botonesBorrar = document.querySelectorAll('.comentarios .borrar')

botonesBorrar.forEach(boton => {
    boton.addEventListener('click', (elem) => {
        const comentarioId = elem.target.getAttribute('data-comentarioId')

        fetch(`http://localhost:3000/comment/delete/${comentarioId}`, {
            method: 'POST',
            mode: 'no-cors'
        })
        .then(response => {
            if(response.ok) {
                location.reload()
                return
            }

            console.log(response)

            if(response.statusText == 'user_not_logged') {
                
    
                return
            }
        })
        .catch(err => {
            console.error(err)
        })
    })
})

botonEnviarComentario.addEventListener('click', (elem) => {
    const libroId = divComentario.getAttribute('data-libroId')

    if(comentario.value.length <= 0) return

    fetch(`http://localhost:3000/libro/${libroId}/comentar`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comentario: comentario.value })
    })
    .then(response => {
        if(response.ok) {
            location.reload()

            return
        }

        if(response.statusText == 'user_not_logged') {
            notificacion.style.display = 'flex'
            notificacion.style.borderTopColor = 'red'

            notificacionIcon.className = 'fa-solid fa-arrow-down'
            notificacionMensaje.innerHTML = 'Inicia sesión para poder utilizar esto.'

            return
        }
    })
    .catch(err => {
        console.error(err)
    })
})

botonVerLuego.addEventListener('click', () => {
    const libroId = botonVerLuego.getAttribute('data-libroId')
    fetch('http://localhost:3000/favorito/' + libroId + '/agregar', { method: 'post' })
        .then(response => {
            if (response.ok) {
                notificacion.style.display = 'flex'
                notificacion.style.borderTopColor = 'orange'

                notificacionIcon.className = 'fa-solid fa-check'
                notificacionMensaje.innerHTML = 'Libro añadido a tu lista de ver luego.'

                return
            }

            if (response.statusText == 'user_not_logged') {
                notificacion.style.display = 'flex'
                notificacion.style.borderTopColor = 'red'

                notificacionIcon.className = 'fa-solid fa-arrow-down'
                notificacionMensaje.innerHTML = 'Inicia sesión para poder utilizar esto.'

                return
            }

            notificacion.style.display = 'flex'
            notificacion.style.borderTopColor = 'orange'

            notificacionIcon.className = 'fa-solid fa-x'
            notificacionMensaje.innerHTML = 'Este libro ya esta añadido a tu lista de ver luego.'
        })
})

botonMeGusta.addEventListener('click', () => {
    const libroId = botonMeGusta.getAttribute('data-libroId')
    fetch('http://localhost:3000/gustado/' + libroId + '/agregar', { method: 'post' })
        .then(response => {
            if (response.ok) {
                notificacion.style.display = 'flex'
                notificacion.style.borderTopColor = 'red'

                notificacionIcon.className = 'fa-solid fa-check'
                notificacionMensaje.innerHTML = 'Libro añadido a tu lista de gustados.'

                return
            } 

            if (response.statusText == 'user_not_logged') {
                notificacion.style.display = 'flex'
                notificacion.style.borderTopColor = 'red'

                notificacionIcon.className = 'fa-solid fa-arrow-down'
                notificacionMensaje.innerHTML = 'Inicia sesión para poder utilizar esto.'

                return
            }

            notificacion.style.display = 'flex'
            notificacion.style.borderTopColor = 'red'

            notificacionIcon.className = 'fa-solid fa-x'
            notificacionMensaje.innerHTML = 'Este libro ya esta añadido a tu lista de gustados.'      
        })
})

botonSeguido.addEventListener('click', () => {
    const libroId = botonSeguido.getAttribute('data-libroId')
    console.log(libroId)

    fetch('http://localhost:3000/seguido/' + libroId + '/agregar', { method: 'post' })
        .then(response => {
            if (response.ok) {
                notificacion.style.display = 'flex'
                notificacion.style.borderTopColor = '#09f'

                notificacionIcon.className = 'fa-solid fa-check'
                notificacionMensaje.innerHTML = 'Libro añadido a tu lista de seguidos.'

                return
            } 

            if (response.statusText == 'user_not_logged') {
                notificacion.style.display = 'flex'
                notificacion.style.borderTopColor = 'red'

                notificacionIcon.className = 'fa-solid fa-arrow-down'
                notificacionMensaje.innerHTML = 'Inicia sesión para poder utilizar esto.'

                return
            }

            notificacion.style.display = 'flex'
            notificacion.style.borderTopColor = '#09f'

            notificacionIcon.className = 'fa-solid fa-x'
            notificacionMensaje.innerHTML = 'Este libro ya esta añadido a tu lista de seguidos.'
        })
})

notificacion.addEventListener('click', () => {
    notificacion.style.display = 'none'
})