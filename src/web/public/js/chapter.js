const chapterHeader = document.querySelector('.capituloHeader')
const desplegable = document.querySelector('.desplegable')

desplegable.addEventListener('click', (e) => {
    const isOpen = chapterHeader.classList.contains('open')
    const scrollValue = window.scrollY

    if (scrollValue < 200)
        return

    if (scrollValue >= 200 && isOpen) {
        chapterHeader.style.transform = `translateY(calc(${scrollValue}px - 315px))`
        chapterHeader.classList.remove('open')
        animation()

        return
    }

    chapterHeader.classList.add('open')
    chapterHeader.style.transform = `translateY(calc(-196px + ${scrollValue}px))`

    animation()
})

window.addEventListener('DOMContentLoaded', () => {
    chapterHeader.classList.add('open')
    desplegable.style.display = 'none'
})

window.addEventListener('scroll', () => {
    const scrollValue = window.scrollY
    const isOpen = chapterHeader.classList.contains('open')

    if (scrollValue >= 200 && !isOpen) {
        chapterHeader.style.transform = `translateY(calc(-315px + ${scrollValue}px))`
        desplegable.style.display = ''

        return
    }

    if (scrollValue >= 200) {
        chapterHeader.style.transform = `translateY(calc(-196px + ${scrollValue}px))`
        desplegable.classList.remove('desplegable-hidden')
        desplegable.style.display = ''

        return
    }

    desplegable.style.display = 'none'
    chapterHeader.style.transform = `translateY(0px)`
})

function animation() {
    chapterHeader.style.transition = 'transform 0.3s ease'
    setTimeout(() => {
        chapterHeader.style.transition = 'none'
    }, 300)
}

tippy('.paginado', {
    content: "Paginado",
    placement: 'bottom'
});

tippy('.cascada', {
    content: "Cascada",
    placement: 'bottom'
});

const fullScreen = document.querySelector('.paginaCompleta')
const separationRange = document.getElementById('separation_range')
const separationNumber = document.getElementById('separation_number')
const imagesContainer = document.getElementById('capituloViewer')

separationRange.addEventListener('input', (e) => {
    const value = e.target.value

    separationNumber.value = value
    changeGap({ value })
})

separationNumber.addEventListener('input', (e) => {
    const value = e.target.value

    if (value.includes('-'))
        return e.target.value = value.replace(/-+/gi, '')

    separationRange.value = value

    changeGap({ value })
})

function changeGap({ value }) {
    imagesContainer.style.gap = `${value}px`
}

// Pantalla completa
fullScreen.addEventListener('click', (e) => {
    const value = e.target.innerText
    e.preventDefault()

    const isFullScreen = document.fullscreenElement
    if (isFullScreen) {
        document.exitFullscreen()
        e.target.innerHTML = '<i class="fa-solid fa-laptop"></i> Pagina completa'
    } else {
        document.documentElement.requestFullscreen()
        e.target.innerHTML = '<i class="fa-solid fa-laptop"></i> Salir de pantalla completa'
    }
})