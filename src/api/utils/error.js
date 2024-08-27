export const responseMessage = ({ code, message, res }) => {
    res.statusMessage = message
    res.status(code).end()
}