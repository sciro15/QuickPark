class Imagen {
    constructor(database) {
        this.database = database;
    }

    // Obtener todas las imágenes
    async getImagenes() {
        const query = 'SELECT * FROM Imagen';
        try {
            const [rows] = await this.database.query(query);
            return rows;
        } catch (err) {
            console.error('Error en getImagenes:', err);
            throw err;
        }
    }

    // Obtener una imagen por su ID
    async getImagenById(id) {
        const query = 'SELECT * FROM Imagen WHERE id = ?';
        try {
            const [rows] = await this.database.query(query, [id]);
            return rows[0]; // Devuelve el primer resultado si existe
        } catch (err) {
            console.error('Error en getImagenById:', err);
            throw err;
        }
    }

    // Eliminar una imagen por su ID
    async deleteImagen(id) {
        const query = 'DELETE FROM Imagen WHERE id = ?';
        try {
            const [result] = await this.database.query(query, [id]);
            return result;
        } catch (err) {
            console.error('Error en deleteImagen:', err);
            throw err;
        }
    }

    // Actualizar una imagen
    async updateImagen(id, Link, Titulo, Propietario, Descripcion, ParqueaderoID) {
        const query = `
            UPDATE Imagen 
            SET Link = ?, Titulo = ?, Propietario = ?, Descripcion = ?, ParqueaderoID = ? 
            WHERE id = ?`;
        try {
            const [result] = await this.database.query(query, [Link, Titulo, Propietario, Descripcion, ParqueaderoID, id]);
            return result;
        } catch (err) {
            console.error('Error en updateImagen:', err);
            throw err;
        }
    }

    // Agregar una nueva imagen
    async addImagen(Link, Titulo, Propietario, Descripcion, ParqueaderoID) {
        const query = `
            INSERT INTO Imagen (Link, Titulo, Propietario, Descripcion, ParqueaderoID) 
            VALUES (?, ?, ?, ?, ?)`;
        try {
            const [result] = await this.database.query(query, [Link, Titulo, Propietario, Descripcion, ParqueaderoID]);
            return result;
        } catch (err) {
            console.error('Error en addImagen:', err);
            throw err;
        }
    }
}

export default Imagen;
