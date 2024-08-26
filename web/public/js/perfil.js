// Para eliminar libros de las listas
const botonesBorrar = document.querySelectorAll('.borrar')

botonesBorrar.forEach(boton => {
    boton.addEventListener('click', (elem) => {
        const libroId = elem.target.getAttribute('data-libroId')
        const libroTipo = document.getElementById('libros').getAttribute('data-type')

        fetch(`http://localhost:3000/${libroTipo}/${libroId}/eliminar`, { method: 'post' })
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
    })
})