import { body } from 'express-validator'

export const createBookValidator = [
    body('title').isLength({ min: 3 }).withMessage('Escribe mas de tres caracteres como mínimo'),
    body('author').isLength({ min: 3 }).withMessage('Escribe mas de tres caracteres como mínimo'),
    body('isbn').isISBN().withMessage('El ISBN no es válido'),
    body('date').isISO8601().withMessage('La fecha no es válida'),
    body('pages').isInt({ min: 1 }).withMessage('La cantidad de páginas debe ser un número entero mayor que 0'),
    body('language').isLength({ min: 4 }).withMessage('El idioma debe tener al menos 4 caracteres'),
    body('publisher').isLength({ min: 4 }).withMessage('La editorial debe tener al menos 4 caracteres'),
    body('state').isIn(['disponible', 'prestado']).withMessage('El estado debe ser disponible o prestado'),
    body('synopsis').isLength({ min: 10 }).withMessage('Escribe mas de 10 caracteres como mínimo'),
    body('pdfLink').isURL().withMessage('El link del pdf debe ser una URL válida')
]