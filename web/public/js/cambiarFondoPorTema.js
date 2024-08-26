const tema = localStorage.getItem('tema')

const fondo = document.getElementById('logeoFondoImg')

if(tema == 'light') {
    document.documentElement.setAttribute('tema', 'light')
    
} else {
    document.documentElement.setAttribute('tema', 'dark')
    
    
}