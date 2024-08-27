const imagenInput = document.getElementById('imagenInput')
const imgPreview = document.getElementById('imagen')

imagenInput.addEventListener('change', (elem) => {
    const file = elem.target.files[0]
    
    if(file) {
        const reader = new FileReader()

        reader.onload = (e) => {
            imgPreview.src = e.target.result 
        }

        reader.readAsDataURL(file)
        return
    }

    imgPreview.src = '#'
})