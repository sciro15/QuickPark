import express from 'express';
import PersonaController from '../controllers/PersonaController.js';
import pool from '../database/db.js'; // Asumiendo que tienes una configuración de base de datos en un archivo aparte

const router = express.Router();
const personaController = new PersonaController(pool);

// Rutas
router.get('/personas', (req, res) => personaController.obtenerPersonas(req, res));
router.get('/personas/:id', (req, res) => personaController.obtenerPersonaPorId(req, res));
router.delete('/personas/:id', (req, res) => personaController.eliminarPersona(req, res));
router.put('/personas/:id', (req, res) => personaController.actualizarPersona(req, res));
router.post('/personas', (req, res) => personaController.agregarPersona(req, res));

export default router;