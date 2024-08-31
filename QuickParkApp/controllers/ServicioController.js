import Servicio from '../models/ServicioModel.js';

class ServicioController {
    constructor(database) {
        this.servicioModel = new Servicio(database);
    }

    // Obtener todos los servicios
    async obtenerServicios(req, res) {
        try {
            const servicios = await this.servicioModel.getServicios();
            res.json(servicios);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener servicios' });
        }
    }

    // Obtener un servicio por su ID
    async obtenerServicioPorId(req, res) {
        const { id } = req.params;
        try {
            const servicio = await this.servicioModel.getServicioById(id);
            if (!servicio) {
                return res.status(404).json({ error: 'Servicio no encontrado' });
            }
            res.json(servicio);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener servicio' });
        }
    }

    // Obtener servicios por ID de Parqueadero
    async obtenerServiciosPorParqueaderoId(req, res) {
        const { parqueaderoId } = req.params;
        try {
            const servicios = await this.servicioModel.getServiciosByParqueaderoId(parqueaderoId);
            res.json(servicios);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener servicios por parqueadero' });
        }
    }

    // Eliminar un servicio por su ID
    async eliminarServicio(req, res) {
        const { id } = req.params;
        try {
            const result = await this.servicioModel.deleteServicio(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Servicio no encontrado' });
            }
            res.json({ message: 'Servicio eliminado correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar servicio' });
        }
    }

    // Actualizar un servicio por su ID
    async actualizarServicio(req, res) {
        const { id } = req.params;
        const { Nombren, ParqueaderoID, Descripcion, Imagen, Precio } = req.body;
        try {
            const result = await this.servicioModel.updateServicio(id, Nombren, ParqueaderoID, Descripcion, Imagen, Precio);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Servicio no encontrado' });
            }
            res.json({ message: 'Servicio actualizado correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar servicio' });
        }
    }

    // Agregar un nuevo servicio
    async agregarServicio(req, res) {
        const { Nombren, ParqueaderoID, Descripcion, Imagen, Precio } = req.body;
        try {
            const result = await this.servicioModel.addServicio(Nombren, ParqueaderoID, Descripcion, Imagen, Precio);
            res.status(201).json({ message: 'Servicio agregado correctamente', id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Error al agregar servicio' });
        }
    }
}

export default ServicioController;
