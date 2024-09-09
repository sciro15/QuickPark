import express from 'express';
import pool from '../database/db.js';
import CalificacionController from '../controllers/CalificacionController.js';

const router = express.Router();
const calificacionController = new CalificacionController(pool);

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/calificaciones', (req, res) => calificacionController.obtenerCalificaciones(req, res));  // Obtener todas las calificaciones
router.get('/calificaciones/:id', (req, res) => calificacionController.obtenerCalificacionPorId(req, res));  // Obtener una calificación por ID
router.delete('/calificaciones/:id', (req, res) => calificacionController.eliminarCalificacion(req, res));  // Eliminar una calificación por ID
router.put('/calificaciones/:id', (req, res) => calificacionController.actualizarCalificacion(req, res));  // Actualizar una calificación por ID
router.post('/calificaciones', (req, res) => calificacionController.agregarCalificacion(req, res));  // Agregar una nueva calificación

export default router;
