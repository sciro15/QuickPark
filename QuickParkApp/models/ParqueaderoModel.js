class Parqueadero {
    constructor(database) {
        this.database = database;
    }

    // Obtener todos los parqueaderos
    async getParqueaderos() {
        const query = 'SELECT * FROM Parqueadero';
        try {
            const [rows] = await this.database.query(query);
            return rows;
        } catch (err) {
            console.error('Error en getParqueaderos:', err);
            throw err;
        }
    }

    // Obtener un parqueadero por su ID
    async getParqueaderoById(id) {
        const query = 'SELECT * FROM Parqueadero WHERE id = ?';
        try {
            const [rows] = await this.database.query(query, [id]);
            return rows[0]; // Devuelve el primer resultado si existe
        } catch (err) {
            console.error('Error en getParqueaderoById:', err);
            throw err;
        }
    }

    // Eliminar un parqueadero por su ID
    async deleteParqueadero(id) {
        const query = 'DELETE FROM Parqueadero WHERE id = ?';
        try {
            const [result] = await this.database.query(query, [id]);
            return result;
        } catch (err) {
            console.error('Error en deleteParqueadero:', err);
            throw err;
        }
    }

    // Actualizar un parqueadero
    async updateParqueadero(id, Nombre, Descripcion, AdministradorID, Direccion, Telefono, Correo, Precio) {
        const query = `
            UPDATE Parqueadero 
            SET Nombre = ?, Texto = ?, AdministradorID = ?, Direccion = ?, Telefono = ?, Correo = ?, Precio = ? 
            WHERE id = ?`;
        try {
            const [result] = await this.database.query(query, [Nombre, Descripcion, AdministradorID, Direccion, Telefono, Correo, Precio, id]);
            return result;
        } catch (err) {
            console.error('Error en updateParqueadero:', err);
            throw err;
        }
    }

    // Agregar un nuevo parqueadero
    async addParqueadero(Nombre, Descripcion, AdministradorID, Direccion, Telefono, Correo, Precio) {
        const query = `
            INSERT INTO Parqueadero (Nombre, Descripcion, AdministradorID, Direccion, Telefono, Correo, Precio) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        try {
            const [result] = await this.database.query(query, [Nombre, Descripcion, AdministradorID, Direccion, Telefono, Correo, Precio]);
            return result;
        } catch (err) {
            console.error('Error en addParqueadero:', err);
            throw err;
        }
    }
}

export default Parqueadero;
