import Imagen from '../models/ImagenModel.js';

class ImagenController {
    constructor(database) {
        this.ImagenModel = new Imagen(database);
    }

    // Obtener todas las imágenes
    async obtenerImagenes(req, res) {
        try {
            const imagenes = await this.ImagenModel.getImagenes();
            res.json(imagenes);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener imágenes' });
        }
    }

    // Obtener una imagen por su ID
    async obtenerImagenPorId(req, res) {
        const { id } = req.params;
        try {
            const imagen = await this.ImagenModel.getImagenById(id);
            if (!imagen) {
                return res.status(404).json({ error: 'Imagen no encontrada' });
            }
            res.json(imagen);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener imagen' });
        }
    }

    // Agregar una nueva imagen
    async agregarImagen(req, res) {
        const { Link, Titulo, Propietario, Descripcion, ParqueaderoID } = req.body;
        try {
            const result = await this.ImagenModel.addImagen(Link, Titulo, Propietario, Descripcion, ParqueaderoID);
            res.status(201).json({ message: 'Imagen agregada correctamente', id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Error al agregar imagen' });
        }
    }

    // Actualizar una imagen existente
    async actualizarImagen(req, res) {
        const { id } = req.params;
        const { Link, Titulo, Propietario, Descripcion, ParqueaderoID } = req.body;
        try {
            const result = await this.ImagenModel.updateImagen(id, Link, Titulo, Propietario, Descripcion, ParqueaderoID);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Imagen no encontrada' });
            }
            res.json({ message: 'Imagen actualizada correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar imagen' });
        }
    }

    // Eliminar una imagen
    async eliminarImagen(req, res) {
        const { id } = req.params;
        try {
            const result = await this.ImagenModel.deleteImagen(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Imagen no encontrada' });
            }
            res.json({ message: 'Imagen eliminada correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar imagen' });
        }
    }
}

export default ImagenController;
