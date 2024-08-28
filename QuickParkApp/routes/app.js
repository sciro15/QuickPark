import express from 'express';
import personaRoutes from './PersonaRoute.js';
import AdministradorRoutes from './AdministradorRote.js';
import ParqueaderoRoutes from './ParqueaderoRoutes.js';
import ServicioRoutes from './ServicioRoutes.js';

const router = express.Router();

// Registrar las rutas importadas
router.use('/personas', personaRoutes);
router.use('/Administrador', AdministradorRoutes);
router.use('/Parqueadero', ParqueaderoRoutes);
router.use('/Parqueadero', ServicioRoutes);

export default router;
