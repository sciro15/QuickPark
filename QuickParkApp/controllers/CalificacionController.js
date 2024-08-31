import Calificacion from "../models/CalificacionModel.Js";

class CalificacionController {
    constructor(database) {
        this.CalificacionModel = new Calificacion(database);
    }

    // Obtener todas las calificaciones
    async obtenerCalificaciones(req, res) {
        try {
            const calificaciones = await this.CalificacionModel.getCalificaciones();
            res.json(calificaciones);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener calificaciones' });
        }
    }

    // Obtener una calificación por ID
    async obtenerCalificacionPorId(req, res) {
        const { id } = req.params;
        try {
            const calificacion = await this.CalificacionModel.getCalificacionById(id);
            if (calificacion.length === 0) {
                return res.status(404).json({ error: 'Calificación no encontrada' });
            }
            res.json(calificacion[0]);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener calificación' });
        }
    }

    // Agregar una nueva calificación
    async agregarCalificacion(req, res) {
        const { UsuarioID, ParqueaderoID, Calificacion, Descripcion } = req.body;
        try {
            const result = await this.CalificacionModel.addCalificacion(UsuarioID, ParqueaderoID, Calificacion, Descripcion);
            res.status(201).json({ message: 'Calificación agregada correctamente', id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Error al agregar calificación' });
        }
    }

    // Actualizar una calificación existente
    async actualizarCalificacion(req, res) {
        const { id } = req.params;
        const { UsuarioID, ParqueaderoID, Calificacion, Descripcion } = req.body;
        try {
            const result = await this.CalificacionModel.updateCalificacion(id, UsuarioID, ParqueaderoID, Calificacion, Descripcion);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Calificación no encontrada' });
            }
            res.json({ message: 'Calificación actualizada correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar calificación' });
        }
    }

    // Eliminar una calificación
    async eliminarCalificacion(req, res) {
        const { id } = req.params;
        try {
            const result = await this.CalificacionModel.deleteCalificacion(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Calificación no encontrada' });
            }
            res.json({ message: 'Calificación eliminada correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar calificación' });
        }
    }
}

export default CalificacionController;
