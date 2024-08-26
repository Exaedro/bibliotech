const navbarBody = document.getElementById('navbarBody')
const navbarMenu = document.getElementById('navbarMenu')
const fondo = document.getElementById('logeoFondoImg')
const menuImg = document.getElementById('navbarMenu')
const colorSwitch = document.getElementById('sol') 

navbarMenu.addEventListener('click', (elem) => {
    const display = navbarBody.style.display
    
    if(display == 'none' || display == '') {
        navbarBody.style.display = 'flex'
    } else {
        navbarBody.style.display = 'none'
    }
})

// colorSwitch.addEventListener('click', (e) => {
//     let temaActual = localStorage.getItem('tema')

//     if(temaActual == 'light') {
//         document.documentElement.setAttribute('tema', 'dark')
        
//         menuImg.src = '/img/menu-negro.png'
//         colorSwitch.src = '/img/sol.svg'
//         if(fondo) fondo.src = '/img/fondo.jpg'

//         localStorage.setItem('tema', 'dark')
//     } else {
//         document.documentElement.setAttribute('tema', 'light')

//         menuImg.src = '/img/menu.png'
//         colorSwitch.src = '/img/sol-negro.svg'
//         if(fondo) fondo.src = '/img/fondo-claro.jpg'

//         localStorage.setItem('tema', 'light')
//     }
// })