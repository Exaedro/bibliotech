const ACCEPTED_ORIGINS = [
    "http://localhost:4000",
    "http://localhost:3000"
]

export const cors = (res, origin) => {
    if(ACCEPTED_ORIGINS.includes(origin))
        res.header('Access-Control-Allow-Origin', origin)
}