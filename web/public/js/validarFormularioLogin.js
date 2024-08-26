const error = document.querySelector('.error')

error.addEventListener('click', (e) => {
    error.style.display = 'none'
})

const config = {
    EMAIL_REGEX: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/g,
    PASSWORD_MIN: 1
}

const notify = document.getElementById('notifyMessage')

const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')

const form = document.getElementById('loginForm')
const formButton = document.getElementById('formButton')

let invalidEmail = false

formButton.addEventListener('click', (elem) => {
    elem.preventDefault()

    const emailLength = emailInput.value.length
    const passwordLength = passwordInput.value.length
    
    if(passwordLength > config.PASSWORD_MIN && emailLength > 0 && invalidEmail == false) {
        document.getElementById('loginForm').submit()
    }
})

emailInput.addEventListener('keyup', (elem) => {
    const email = emailInput.value
    validateEmail({ email })
})

password.addEventListener('keyup', (elem) => {
    const password = passwordInput.value
    validatePassword({ password })
})

function validateEmail({ email }) {
    const emailMessageError = document.getElementById('emailMessageError')

    const isValid = email.match(config.EMAIL_REGEX)
    if(!isValid && email.length > 0) {
        emailMessageError.className = 'show'

        invalidEmail = true

        return
    }

    emailMessageError.classList = 'hidden'
    invalidEmail = false
}

function validatePassword({ password }) {
    const passwordMessageError = document.getElementById('passwordMessageError')
    console.log(password)
    if(password.length <= 0) {
        
        passwordMessageError.className = 'show'

        return
    } 

    passwordMessageError.className = 'hidden'
}