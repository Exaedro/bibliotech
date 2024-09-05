const inputs = document.querySelectorAll('#crearLibroForm input')

const titleError = document.getElementById('titleError')

inputs.forEach(input => {
    input.addEventListener('keydown', (elem) => {
        const value = elem.target.value
        const type = elem.target.getAttribute('name')
        validateInput({ value, type })
    })
})

function validateInput({ value, type }) {
    switch(type) {
        case 'title': {
            if(value.length == 0) {
                return showError({ error: 'inputVoid' })
            }

            titleError.className = 'error hidden'
            break
        }
    }
}

function showError({ error }) {
    console.log(error)

    if(error == 'inputVoid') {
        titleError.className = 'error'
        return
    }
}