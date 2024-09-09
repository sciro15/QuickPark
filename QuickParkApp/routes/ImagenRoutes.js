import express from 'express';
import pool from '../database/db.js';
import ImagenController from '../controllers/ImagenController.js';

const router = express.Router();
const imagenController = new ImagenController(pool);

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/imagenes', (req, res) => imagenController.obtenerImagenes(req, res)); // Obtener todas las imágenes
router.get('/imagenes/:id', (req, res) => imagenController.obtenerImagenPorId(req, res)); // Obtener una imagen por ID
router.post('/imagenes', (req, res) => imagenController.agregarImagen(req, res)); // Agregar una nueva imagen
router.put('/imagenes/:id', (req, res) => imagenController.actualizarImagen(req, res)); // Actualizar una imagen por ID
router.delete('/imagenes/:id', (req, res) => imagenController.eliminarImagen(req, res)); // Eliminar una imagen por ID

export default router;
