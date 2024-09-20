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

    // Agregar un nuevo parqueadero
    async addParqueadero(
        Nombre,
        Direccion,
        Telefono,
        Correo,
        lat,
        lng,
        AdministradorID,
        TarifaHora,
        TarifaDia,
        TarifaMensual,
        Descripcion,
        Servicios,
        Caracteristicas,
        ImagenPortada = null // Valor predeterminado si no se pasa
    ) {
        const query = `
            INSERT INTO Parqueadero 
            (Nombre, Direccion, Telefono, Correo, lat, lng, AdministradorID, TarifaHora, TarifaDia, TarifaMensual, Descripcion, Servicios, Caracteristicas, ImagenPortada)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Asegúrate de que todos los valores no sean undefined, reemplazando undefined por null
        const values = [
            Nombre || null,
            Direccion || null,
            Telefono || null,
            Correo || null,
            lat || null,
            lng || null,
            AdministradorID || null,
            TarifaHora || null,
            TarifaDia || null,
            TarifaMensual || null,
            Descripcion || null,
            Servicios ? JSON.stringify(Servicios) : null,  // JSON string of services
            Caracteristicas ? JSON.stringify(Caracteristicas) : null, // JSON string of characteristics
            ImagenPortada || null // ImagenPortada se permite null si es opcional
        ];

        try {
            const [result] = await this.database.execute(query, values); // Asegúrate de que this.database se está utilizando correctamente
            return result;  // Aquí debería tener `insertId`
        } catch (error) {
            console.error("Error al agregar parqueadero:", error);
            throw error;
        }
    }

    // Actualizar un parqueadero
    async updateParqueadero(
        id,
        Nombre,
        Direccion,
        Telefono,
        Correo,
        lat,
        lng,
        AdministradorID,
        TarifaHora,
        TarifaDia,
        TarifaMensual,
        Descripcion,
        Servicios,
        Caracteristicas,
        ImagenPortada
    ) {
        let query = `
            UPDATE Parqueadero
            SET Nombre = ?, Direccion = ?, Telefono = ?, Correo = ?, lat = ?, lng = ?, TarifaHora = ?, TarifaDia = ?, TarifaMensual = ?, Descripcion = ?, Servicios = ?, Caracteristicas = ?, ImagenPortada = ?
            WHERE id = ?
        `;
    
        const values = [
            Nombre,
            Direccion,
            Telefono,
            Correo,
            lat,
            lng,
            TarifaHora,
            TarifaDia,
            TarifaMensual,
            Descripcion,
            Servicios ? JSON.stringify(Servicios) : null,
            Caracteristicas ? JSON.stringify(Caracteristicas) : null,
            ImagenPortada,
            id
        ];
    
        // Si AdministradorID está definido, lo incluimos en la consulta
        if (AdministradorID !== undefined) {
            query = `
                UPDATE Parqueadero
                SET Nombre = ?, Direccion = ?, Telefono = ?, Correo = ?, lat = ?, lng = ?, AdministradorID = ?, TarifaHora = ?, TarifaDia = ?, TarifaMensual = ?, Descripcion = ?, Servicios = ?, Caracteristicas = ?, ImagenPortada = ?
                WHERE id = ?
            `;
            values.splice(6, 0, AdministradorID); // Insertar AdministradorID en la posición correcta
        }
    
        try {
            const [result] = await this.database.query(query, values);
            return result;
        } catch (error) {
            console.error('Error en updateParqueadero:', error);
            throw error;
        }
    }
    

    // Obtener parqueaderos por administrador
    async getParqueaderosByAdministrador(id) {
        const query = 'SELECT * FROM Parqueadero WHERE AdministradorID = ?';
        try {
            const [rows] = await this.database.query(query, [id]);
            return rows;
        } catch (err) {
            console.error('Error en getParqueaderosByAdministrador:', err);
            throw err;
        }
    }
}

export default Parqueadero;
