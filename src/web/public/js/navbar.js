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

const dropdownContent = document.getElementById('dropdownContent')
const p = document.getElementById('dropdown')

p.addEventListener('click', (elem) => {
    const display = dropdownContent.style.display

    if(display == 'none' || display == '') {
        dropdownContent.style.display = 'flex'
    } else {
        dropdownContent.style.display = 'none'
    }
}) 