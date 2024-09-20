import multer from 'multer';
import path from 'path';

class Parqueadero {
    constructor(database) {
        this.database = database;

        // Configuración de multer
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombra el archivo de manera única
            }
        });

        this.upload = multer({ storage });
    }

    // Middleware para subir imágenes
    uploadMiddleware() {
        return this.upload.single('ImagenPortada'); // Asegúrate de que este nombre coincida con el campo del formulario
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
        ImagenPortada // Aquí es donde recibimos el nombre del archivo
    ) {
        const query = `
            INSERT INTO Parqueadero 
            (Nombre, Direccion, Telefono, Correo, lat, lng, AdministradorID, TarifaHora, TarifaDia, TarifaMensual, Descripcion, Servicios, Caracteristicas, ImagenPortada)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

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
            Servicios ? JSON.stringify(Servicios) : null,
            Caracteristicas ? JSON.stringify(Caracteristicas) : null,
            ImagenPortada || null
        ];

        try {
            const [result] = await this.database.execute(query, values);
            return result; // Aquí debería tener `insertId`
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
        ImagenPortada // Aquí también lo recibimos
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
            ImagenPortada || null,
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
