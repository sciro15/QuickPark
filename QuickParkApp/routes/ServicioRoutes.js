import express from 'express';
import ServicioController from '../controllers/ServicioController.js';
import pool from '../database/db.js'; // Asegúrate de que la conexión de la base de datos esté disponible

const router = express.Router();
const servicioController = new ServicioController(pool);

// Define las rutas para servicios
router.get('/Servicio', (req, res) => servicioController.obtenerServicios(req, res));
router.get('/Servicio/:id', (req, res) => servicioController.obtenerServicioPorId(req, res));
router.post('/Servicio', (req, res) => servicioController.agregarServicio(req, res));
router.put('/Servicio/:id', (req, res) => servicioController.actualizarServicio(req, res));
router.delete('/Servicio/:id', (req, res) => servicioController.eliminarServicio(req, res));

export default router;
