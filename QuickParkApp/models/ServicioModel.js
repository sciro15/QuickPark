class Servicio {
    constructor(database) {
        this.database = database;
    }

    // Obtener todos los servicios
    async getServicios() {
        const query = 'SELECT * FROM Servicio';
        try {
            const [rows] = await this.database.query(query);
            return rows;
        } catch (err) {
            console.error('Error en getServicios:', err);
            throw err;
        }
    }

    // Obtener un servicio por su ID
    async getServicioById(id) {
        const query = 'SELECT * FROM Servicio WHERE id = ?';
        try {
            const [rows] = await this.database.query(query, [id]);
            return rows[0];
        } catch (err) {
            console.error('Error en getServicioById:', err);
            throw err;
        }
    }

    // Obtener todos los servicios por el ID de Parqueadero
    async getServiciosByParqueaderoId(parqueaderoId) {
        const query = 'SELECT * FROM Servicio WHERE ParqueaderoID = ?';
        try {
            const [rows] = await this.database.query(query, [parqueaderoId]);
            return rows;
        } catch (err) {
            console.error('Error en getServiciosByParqueaderoId:', err);
            throw err;
        }
    }

    // Eliminar un servicio por su ID
    async deleteServicio(id) {
        const query = 'DELETE FROM Servicio WHERE id = ?';
        try {
            const [result] = await this.database.query(query, [id]);
            return result;
        } catch (err) {
            console.error('Error en deleteServicio:', err);
            throw err;
        }
    }

    // Actualizar un servicio por su ID
    async updateServicio(id, Nombren, ParqueaderoID, Descripcion, Imagen, Precio) {
        const query = 'UPDATE Servicio SET Nombren = ?, ParqueaderoID = ?, Descripcion = ?, Imagen = ?, Precio = ? WHERE id = ?';
        try {
            const [result] = await this.database.query(query, [Nombren, ParqueaderoID, Descripcion, Imagen, Precio, id]);
            return result;
        } catch (err) {
            console.error('Error en updateServicio:', err);
            throw err;
        }
    }

    // Agregar un nuevo servicio
    async addServicio(Nombren, ParqueaderoID, Descripcion, Imagen, Precio) {
        const query = 'INSERT INTO Servicio (Nombren, ParqueaderoID, Descripcion, Imagen, Precio) VALUES (?, ?, ?, ?, ?)';
        try {
            const [result] = await this.database.query(query, [Nombren, ParqueaderoID, Descripcion, Imagen, Precio]);
            return result;
        } catch (err) {
            console.error('Error en addServicio:', err);
            throw err;
        }
    }
}

export default Servicio;
