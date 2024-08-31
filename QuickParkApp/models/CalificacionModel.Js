class Calificacion {
    constructor(database) {
        this.database = database;
    }

    async getCalificaciones() {
        const query = 'SELECT * FROM Calificacion';
        try {
            const [rows] = await this.database.query(query);
            return rows;
        } catch (err) {
            console.error('Error en getCalificaciones:', err);
            throw err;
        }
    }

    async getCalificacionById(id) {
        const query = 'SELECT * FROM Calificacion WHERE id = ?';
        try {
            const [rows] = await this.database.query(query, [id]);
            return rows;
        } catch (err) {
            console.error('Error en getCalificacionById:', err);
            throw err;
        }
    }

    async deleteCalificacion(id) {
        const query = 'DELETE FROM Calificacion WHERE id = ?';
        try {
            const [result] = await this.database.query(query, [id]);
            return result;
        } catch (err) {
            console.error('Error en deleteCalificacion:', err);
            throw err;
        }
    }

    async updateCalificacion(id, UsuarioID, ParqueaderoID, Calificacion, Descripcion) {
        const query = 'UPDATE Calificacion SET UsuarioID = ?, ParqueaderoID = ?, Calificacion = ?, Descripcion = ? WHERE id = ?';
        try {
            const [result] = await this.database.query(query, [UsuarioID, ParqueaderoID, Calificacion, Descripcion, id]);
            return result;
        } catch (err) {
            console.error('Error en updateCalificacion:', err);
            throw err;
        }
    }

    async addCalificacion(UsuarioID, ParqueaderoID, Calificacion, Descripcion) {
        const query = 'INSERT INTO Calificacion (UsuarioID, ParqueaderoID, Calificacion, Descripcion) VALUES (?, ?, ?, ?)';
        try {
            const [result] = await this.database.query(query, [UsuarioID, ParqueaderoID, Calificacion, Descripcion]);
            return result;
        } catch (err) {
            console.error('Error en addCalificacion:', err);
            throw err;
        }
    }
}

export default Calificacion;
