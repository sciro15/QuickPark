import express from 'express';
import pool from '../database/db.js'; // Tu pool de conexión a la base de datos
import authenticateUser from '../controllers/authController.js';

const router = express.Router();

// Ruta para autenticación
router.post('/login', (req, res) => authenticateUser(req, res)); // Autenticación de usuario

export default router;
 