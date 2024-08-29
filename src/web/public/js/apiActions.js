const code = document.querySelectorAll('code')
code.forEach(c => {
    c.innerHTML = c.innerHTML + ' <i class="fa-solid fa-arrow-up-right-from-square"></i>'
    
    c.addEventListener('click', (e) => {
        e.preventDefault()
        c.innerHTML = c.innerHTML.replace('fa-arrow-up-right-from-square', 'fa-check')
        navigator.clipboard.writeText(c.innerText)

        setTimeout(() => {
            c.innerHTML = c.innerHTML.replace('fa-check', 'fa-arrow-up-right-from-square')
        }, 1300)
    })
})