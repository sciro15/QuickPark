import express from 'express';
import pool from '../database/db.js';
import ParqueaderoController from '../controllers/ParqueaderoController.js';

const router = express.Router();
const parqueaderoController = new ParqueaderoController(pool);

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/parqueadero', (req, res) => parqueaderoController.obtenerParqueaderos(req, res));
router.get('/parqueadero/:id', (req, res) => parqueaderoController.obtenerParqueaderoPorId(req, res));
router.delete('/parqueadero/:id', (req, res) => parqueaderoController.eliminarParqueadero(req, res));
router.put('/parqueadero/:id', parqueaderoController.uploadMiddleware(), (req, res) => 
    parqueaderoController.actualizarParqueadero(req, res)
);
router.post('/parqueadero', parqueaderoController.uploadMiddleware(), (req, res) => 
    parqueaderoController.agregarParqueadero(req, res)
);
router.get('/Admin/:id', (req, res) => parqueaderoController.getParqueaderosByAdministrador(req, res));

export default router;
