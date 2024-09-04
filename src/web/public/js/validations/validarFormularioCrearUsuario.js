/**
 * ! TERMINAR Y MEJORAR
 * ! TERMINAR Y MEJORAR
 */

const crearUsuarioForm = document.getElementById('crearUsuarioForm')

const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const confirmPasswordInput = document.getElementById('confirmPassword')

const nameMessageError = document.getElementById('nameError')
const emailMessageError = document.getElementById('emailError')
const passwordMessageError = document.getElementById('passwordError')
const passwordNotMatchMessageError = document.getElementById('passwordNotMatch')

const config = {
    EMAIL_REGEX: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/g
}

let emailIsValid = false

crearUsuarioForm.addEventListener('submit', (elem) => {
    elem.preventDefault()

    const name = nameInput.value
    const email = emailInput.value
    const password = passwordInput.value
    const confirmPassword = confirmPasswordInput.value

    if(name.length <= 0 || email.length <= 0 || password.length <= 0 || confirmPassword.length <= 0 || !emailIsValid) {
        return
    }
})

nameInput.addEventListener('keyup', (elem) => {
    const name = nameInput.value
    validateName({ name })
})

emailInput.addEventListener('keyup', (elem) => {
    const email = emailInput.value
    validateEmail({ email })
})

passwordInput.addEventListener('keyup', (elem) => {
    const password = passwordInput.value
    validatePassword({ password })
})

/*
    ! ARREGLAR LA VALIDACION DE LA CONTRASEÑA
*/
passwordInput.addEventListener('keyup', (elem) => {
    confirmPasswordInput.addEventListener('keyup', (elem) => {
        const password = passwordInput.value
        const confirmPassword = confirmPasswordInput.value
        validateConfirmPassword({ password, confirmPassword })
    })
})

function validateName({ name }) {
    if(name.length <= 0) {
        nameInput.style.borderWidth = '1px!important'
        nameInput.style.borderColor = 'red!important'
        nameMessageError.className = 'error'

        return
    } 

    nameInput.style.borderColor = 'var(--color-fondo-secundario)'
    nameMessageError.className = 'error hidden'
}

function validateEmail({ email }) {
    const isValid = email.match(config.EMAIL_REGEX)
    if(!isValid || email.length <= 0) {
        emailInput.style.borderWidth = '1px!important'
        emailInput.style.borderColor = 'red!important'
        emailMessageError.className = 'error'
        emailIsValid = false

        return
    }

    emailIsValid = true
    emailInput.style.borderColor = 'var(--color-fondo-secundario)'
    emailMessageError.className = 'error hidden'
}

const validatePassword = ({ password }) => {
    const passwordLength = password.length
    if(passwordLength <= 0) {
        passwordInput.style.borderWidth = '1px!important'
        passwordInput.style.borderColor = 'red!important'
        passwordMessageError.className = 'error'

        return
    } 

    passwordInput.style.borderColor = 'var(--color-fondo-secundario)'
    passwordMessageError.className = 'error hidden'
}

const validateConfirmPassword = ({ password, confirmPassword }) => {
    const confirmPasswordLength = confirmPassword.length
    if(confirmPasswordLength <= 0) {
        confirmPasswordInput.style.borderWidth = '1px!important'
        confirmPasswordInput.style.borderColor = 'red!important'
        passwordNotMatchMessageError.className = 'error'

        return
    }

    if(password != confirmPassword) {
        confirmPasswordInput.style.borderWidth = '1px!important'
        confirmPasswordInput.style.borderColor = 'red!important'
        passwordNotMatchMessageError.className = 'error'

        return
    }

    confirmPasswordInput.style.borderColor = 'var(--color-fondo-secundario)'
    passwordNotMatchMessageError.className = 'error hidden'
}