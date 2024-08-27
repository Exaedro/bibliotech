const navbarBody = document.getElementById('navbarBody')
const navbarMenu = document.getElementById('navbarMenu')

navbarMenu.addEventListener('click', (elem) => {
    const display = navbarBody.style.display
    
    if(display == 'none' || display == '') {
        navbarBody.style.display = 'flex'
    } else {
        navbarBody.style.display = 'none'
    }
})