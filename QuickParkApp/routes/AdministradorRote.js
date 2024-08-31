import express from 'express';
import pool from '../database/db.js'; // Asumiendo que tienes una configuración de base de datos en un archivo aparte
import AdministradorController from '../controllers/AdministradorController.js';

const router = express.Router();
const administradorController = new AdministradorController(pool);

// Rutas
router.get('/Administrador', (req, res) => administradorController.obtenerAdministrador(req, res));
router.get('/Administrador/:id', (req, res) => administradorController.obtenerAdministradorPorId(req, res));
router.delete('/Administrador/:id', (req, res) => administradorController.eliminarAdministrador(req, res));
router.put('/Administrador/:id', (req, res) => administradorController.actualizarAdministrador(req, res));
router.post('/Administrador', (req, res) => administradorController.agregarAdministrador(req, res));

export default router;