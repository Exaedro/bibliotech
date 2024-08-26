const ACCEPTED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:4000'
]

export const corsMiddleware = (res, origin) => {
    if(ACCEPTED_ORIGINS.includes(origin))
        res.header('Access-Control-Allow-Origin', origin)
}