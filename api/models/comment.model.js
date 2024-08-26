// Base de datos
import connection from "../database.js";

class CommentModel {

    /**
     * 
     * @param {string} bookTitle - titulo del libro, tiene que ser exacto
     * @param {integer} bookId - id del libro
     */
    static async getComments({ bookTitle, bookId }) {
        const db = await connection()

        if(bookTitle || bookId) {
            const [comments] = await db.query(`SELECT c.ComentarioID, c.UsuarioID, c.LibroID, c.Comentario, c.FechaComentario FROM comentarios c JOIN libros l ON c.LibroID = l.LibroID WHERE l.Titulo = '${bookTitle}' OR l.LibroID = '${bookId}'`)
            return comments
        }

        const [comments] = await db.query(`SELECT * FROM comentarios`)
        return comments
    }

    /**
     * 
     * @param {integer} userId - id del usuario logeado
     * @param {integer} bookId - id del libro donde el usuario quiere comentar
     * @param {string} comment - el comentario que ingreso el usuario 
     */
    static async createComment({ userId, bookId, comment }) {
        const db = await connection()

        const commentCreated = await db.query(`INSERT INTO comentarios (UsuarioID, LibroID, Comentario) VALUES ('${userId}', '${bookId}', '${comment}')`)

        return commentCreated
    }

    /**
     * 
     * @param {integer} id - id del comentario a borrar 
     */
    static async deleteCommentById({ id }) {
        const db = await connection()

        await db.query(`DELETE FROM comentarios WHERE ComentarioID = ${id}`)
    }
}

export default CommentModel