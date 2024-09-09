import Parqueadero from '../models/ParqueaderoModel.js'; 

class ParqueaderoController {
    constructor(database) {
        this.parqueaderoModel = new Parqueadero(database);
    }

    // Obtener todos los parqueaderos
    async obtenerParqueaderos(req, res) {
        try {
            const parqueaderos = await this.parqueaderoModel.getParqueaderos();
            res.json(parqueaderos);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener parqueaderos' });
        }
    }

    // Obtener un parqueadero por su ID
    async obtenerParqueaderoPorId(req, res) {
        const { id } = req.params;
        try {
            const parqueadero = await this.parqueaderoModel.getParqueaderoById(id);
            if (!parqueadero) {
                return res.status(404).json({ error: 'Parqueadero no encontrado' });
            }
            res.json(parqueadero);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener parqueadero' });
        }
    }

    // Eliminar un parqueadero por su ID
    async eliminarParqueadero(req, res) {
        const { id } = req.params;
        try {
            const result = await this.parqueaderoModel.deleteParqueadero(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Parqueadero no encontrado' });
            }
            res.json({ message: 'Parqueadero eliminado correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar parqueadero' });
        }
    }

    // Actualizar un parqueadero por su ID
    async actualizarParqueadero(req, res) {
        const { id } = req.params;
        const { Nombre, Texto, AdministradorID, Direccion, Telefono, Correo, Precio } = req.body;
        try {
            const result = await this.parqueaderoModel.updateParqueadero(id, Nombre, Texto, AdministradorID, Direccion, Telefono, Correo, Precio);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Parqueadero no encontrado' });
            }
            res.json({ message: 'Parqueadero actualizado correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar parqueadero' });
        }
    }

    // Agregar un nuevo parqueadero
    async agregarParqueadero(req, res) {
        const { Nombre, Texto, AdministradorID, Direccion, Telefono, Correo, Precio } = req.body;
        try {
            const result = await this.parqueaderoModel.addParqueadero(Nombre, Texto, AdministradorID, Direccion, Telefono, Correo, Precio);
            res.status(201).json({ message: 'Parqueadero agregado correctamente', id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Error al agregar parqueadero' });
        }
    }
}

export default ParqueaderoController;
