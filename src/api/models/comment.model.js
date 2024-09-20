// Base de datos
import db from "../database.js";

class CommentModel {

    /**
     * 
     * @param {string} bookTitle - titulo del libro, tiene que ser exacto
     * @param {integer} bookId - id del libro
     */
    static async getComments({ bookTitle, bookId }) {
        if(bookTitle || bookId) {
            const [comments] = await db.query(`SELECT c.ComentarioID, c.UsuarioID, c.LibroID, c.Comentario, c.FechaComentario, c.Editado, u.Nombre, u.Imagen FROM comentarios c JOIN libros l ON c.LibroID = l.LibroID JOIN usuarios u ON c.UsuarioID = u.UsuarioID WHERE l.Titulo = '${bookTitle}' OR l.LibroID = '${bookId}' ORDER BY c.FechaComentario DESC`)
            
            const data = comments.map(comment => {
                return {
                    id: comment.ComentarioID,
                    user: {
                        id: comment.UsuarioID,
                        username: comment.Nombre,
                        image: comment.Imagen
                    },
                    book: {
                        id: comment.LibroID,
                        title: comment.Titulo,
                        image: comment.imagen
                    },
                    comment: comment.Comentario,
                    date: comment.FechaComentario,
                    edited: comment.Editado
                }
            })

            return data
        }

        const [comments] = await db.query(`SELECT * FROM comentarios c JOIN libros l ON c.LibroID = l.LibroID ORDER BY c.FechaComentario DESC`)

        const data = comments.map(comment => {
            return {
                id: comment.ComentarioID,
                user: {
                    id: comment.UsuarioID,
                    username: comment.Nombre,
                    image: comment.Imagen
                },
                book: {
                    id: comment.LibroID,
                    title: comment.Titulo,
                    image: comment.imagen
                },
                comment: comment.Comentario,
                date: comment.FechaComentario,
                edited: comment.Editado
            }
        })

        return data
    }

    /**
     * 
     * @param {integer} userId - id del usuario logeado
     * @param {integer} bookId - id del libro donde el usuario quiere comentar
     * @param {string} comment - el comentario que ingreso el usuario 
     */
    static async createComment({ userId, bookId, comment }) {
        const commentCreated = await db.query(`INSERT INTO comentarios (UsuarioID, LibroID, Comentario) VALUES ('${userId}', '${bookId}', '${comment}')`)

        return commentCreated
    }

    /**
     * 
     * @param {integer} id - id del comentario a borrar 
     */
    static async deleteCommentById({ id }) {
        await db.query(`DELETE FROM comentarios WHERE ComentarioID = ${id}`)
    }

    /**
     * 
     * @param {integer} id - id del comentario a editar
     * @param {string} comment - el nuevo comentario que ingreso el usuario
     */
    static async editComment({ id, comment }) {
        await db.query(`UPDATE comentarios SET Comentario = ?, Editado = ? WHERE ComentarioID = ?`, [comment, true, id])
    }
}

export default CommentModel