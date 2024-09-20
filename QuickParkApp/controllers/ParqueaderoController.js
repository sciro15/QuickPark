import Parqueadero from '../models/ParqueaderoModel.js';
import multer from 'multer';
import path from 'path';

class ParqueaderoController {
    constructor(database) {
        this.parqueaderoModel = new Parqueadero(database);
        
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
    async obtenerParqueaderos(req, res) {
        try {
            const parqueaderos = await this.parqueaderoModel.getParqueaderos();
            res.json(parqueaderos);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener parqueaderos' });
        }
    }

    // Obtener un parqueadero por su ID
    async obtenerParqueaderoPorId(req, res) {
        const { id } = req.params;
        try {
            const parqueadero = await this.parqueaderoModel.getParqueaderoById(id);
            if (!parqueadero) {
                return res.status(404).json({ error: 'Parqueadero no encontrado' });
            }
            res.json(parqueadero);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener parqueadero' });
        }
    }

    // Eliminar un parqueadero por su ID
    async eliminarParqueadero(req, res) {
        const { id } = req.params;
        try {
            const result = await this.parqueaderoModel.deleteParqueadero(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Parqueadero no encontrado' });
            }
            res.json({ message: 'Parqueadero eliminado correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar parqueadero' });
        }
    }

    // Actualizar un parqueadero por su ID
    async actualizarParqueadero(req, res) {
        const { id } = req.params;
        const {
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
        } = req.body;

        // Obtener el nombre del archivo subido
        const ImagenPortada = req.file ? req.file.filename : null;

        try {
            const serviciosJson = typeof Servicios === 'string' ? Servicios : JSON.stringify(Servicios);
            const caracteristicasJson = typeof Caracteristicas === 'string' ? Caracteristicas : JSON.stringify(Caracteristicas);

            const result = await this.parqueaderoModel.updateParqueadero(
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
                serviciosJson,
                caracteristicasJson,
                ImagenPortada
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Parqueadero no encontrado' });
            }

            res.status(200).json({ message: 'Parqueadero actualizado correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar parqueadero' });
        }
    }

    // Agregar un nuevo parqueadero
    async agregarParqueadero(req, res) {
        const {
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
        } = req.body;

        // Obtener el nombre del archivo subido
        const ImagenPortada = req.file ? req.file.filename : null;

        try {
            const serviciosJson = typeof Servicios === 'string' ? Servicios : JSON.stringify(Servicios);
            const caracteristicasJson = typeof Caracteristicas === 'string' ? Caracteristicas : JSON.stringify(Caracteristicas);

            const result = await this.parqueaderoModel.addParqueadero(
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
                serviciosJson,
                caracteristicasJson,
                ImagenPortada
            );

            res.status(201).json({ message: 'Parqueadero agregado correctamente', id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Error al agregar parqueadero' });
        }
    }

    // Obtener parqueaderos por administrador
    async getParqueaderosByAdministrador(req, res) {
        const { id } = req.params;
        try {
            const parqueaderos = await this.parqueaderoModel.getParqueaderosByAdministrador(id);
            res.status(200).json(parqueaderos);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener parqueaderos' });
        }
    }
}

export default ParqueaderoController;
