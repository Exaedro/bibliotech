const config = {
    USERNAME_MIN: 3,
    EMAIL_REGEX: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/g,
    MESSAGE_MIN: 3
}

const notify = document.getElementById('notifyMessage')

const usernameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('password')

const form = document.getElementById('registerForm')
const formButton = document.getElementById('formButton')

let invalidEmail = false

formButton.addEventListener('click', (elem) => {
    elem.preventDefault()

    const usernameLength = usernameInput.value.length
    const emailLength = emailInput.value.length
    const messageLength = messageInput.value.length
    
    if(usernameLength > config.USERNAME_MIN && messageLength > config.MESSAGE_MIN && emailLength > 0 && invalidEmail == false) {
        document.getElementById('registerForm').submit()
    }
})

usernameInput.addEventListener('keyup', (elem) => {
    const username = usernameInput.value
    validateUsername({ username })
})

emailInput.addEventListener('keyup', (elem) => {
    const email = emailInput.value
    validateEmail({ email })
})

messageInput.addEventListener('keyup', (elem) => {
    const message = messageInput.value
    validateMessage({ message })
})

function validateUsername({ username }) {
    const lengthError = document.getElementById('lengthError')

    if(username.length <= config.USERNAME_MIN && username.length > 0) {
        lengthError.className = 'show'
        
        return
    } 

    lengthError.className = 'hidden'
    usernameInput.className = ''
}

function validateEmail({ email }) {
    const emailMessageError = document.getElementById('emailMessageError')

    const isValid = email.match(config.EMAIL_REGEX)
    if(!isValid && email.length > 0) {
        emailMessageError.className = 'show'

        invalidEmail = true

        return
    }

    emailInput.className = ''
    emailMessageError.classList = 'hidden'
    invalidEmail = false
}

function validateMessage({ message }) {
    const messageMessageError = document.getElementById('messageMessageError')

    if(message.length <= config.MESSAGE_MIN && message.length > 0) {
        messageMessageError.className = 'show'

        return
    } 

    messageInput.className = ''
    messageMessageError.className = 'hidden'
}