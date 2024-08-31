import Persona from '../models/PersonasModel.js'; 
class PersonaController {
    constructor(database) {
        this.personaModel = new Persona(database);
    }

    async obtenerPersonas(req, res) {
        try {
            const personas = await this.personaModel.getPersona();
            res.json(personas);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener personas' });
        }
    }

    async obtenerPersonaPorId(req, res) {
        const { id } = req.params;
        try {
            const persona = await this.personaModel.getPersonaById(id);
            if (persona.length === 0) {
                return res.status(404).json({ error: 'Persona no encontrada' });
            }
            res.json(persona[0]);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener persona' });
        }
    }

    async eliminarPersona(req, res) {
        const { id } = req.params;
        try {
            const result = await this.personaModel.deletePersona(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Persona no encontrada' });
            }
            res.json({ message: 'Persona eliminada correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar persona' });
        }
    }

    async actualizarPersona(req, res) {
        const { id } = req.params;
        const { Nombres, Apellidos, Correo, Usuario, Contraseña } = req.body;
        try {
            const result = await this.personaModel.updatePersona(id, Nombres, Apellidos, Correo, Usuario, Contraseña);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Persona no encontrada' });
            }
            res.json({ message: 'Persona actualizada correctamente' });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar persona' });
        }
    }

    async agregarPersona(req, res) {
        const { Nombres, Apellidos, Correo, Usuario, Contraseña } = req.body;
        try {
            const result = await this.personaModel.addPersona(Nombres, Apellidos, Correo, Usuario, Contraseña);
            res.status(201).json({ message: 'Persona agregada correctamente', id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: 'Error al agregar persona' });
        }
    }
}

export default PersonaController;
