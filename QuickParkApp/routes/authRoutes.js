import express from 'express';
import {authenticateUser, getSessionData } from '../controllers/authController.js';
import verifyToken from '../middleware/middleware.js';

const router = express.Router();

// Ruta para autenticación
router.post('/login', (req, res) => authenticateUser(req, res)); // Autenticación de usuario

router.get('/protected', verifyToken, getSessionData);


export default router;
 