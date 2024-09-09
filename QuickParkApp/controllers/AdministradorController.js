import Administrador from '../models/AdministradorModel.js';
class AdministradorController {
    constructor(database) {
        this.AdministradorModel = new Administrador(database);
    }

    async obtenerAdministrador(req, res) {
        try {
            const Administrador = await this.AdministradorModel.getAdministrador();
            res.json(Administrador);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener Administrador' });
        }
    }

    async obtenerAdministradorPorId(req, res) {
        const { id } = req.params;
        try {
            const Administrador = await this.AdministradorModel.getAdministradorById(id);
            if (Administrador.length === 0) {
                return res.status(404).json({ error: 'Administrador no encontrado' });
            }
            res.json(Administrador[0]);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener Administrador' });
        }
    }

    async eliminarAdministrador(req, res) {
        const { id } = req.params;
        try {
            const result = await this.AdministradorModel.deleteAdministrador(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Administrador no encontrado' });
            }
            res.json({ message: 'Administrador eliminado correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar Administrador' });
        }
    }

    async actualizarAdministrador(req, res) {
        const { id } = req.params;
        const { Nombres, Apellidos, Correo, Usuario, Contraseña } = req.body;
        try {
            const result = await this.AdministradorModel.updateAdministrador(id, Nombres, Apellidos, Correo, Usuario, Contraseña);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Administrador no encontrado' });
            }
            res.json({ message: 'Administrador actualizado correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar Administrador' });
        }
    }

    async agregarAdministrador(req, res) {
        const { Nombres, Apellidos, Correo, Usuario, Contraseña } = req.body;
        try {
            const result = await this.AdministradorModel.addAdministrador(Nombres, Apellidos, Correo, Usuario, Contraseña);
            res.status(201).json({ message: 'Administrador agregado correctamente', id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Error al agregar Administrador' });
        }
    }
}

export default AdministradorController;
