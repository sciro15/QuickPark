import crypto from 'crypto';
class Persona {
    constructor(database) {
        this.database = database;
    } 

    async getPersona() {
        const query = 'SELECT * FROM Persona';
        try {
            const [rows] = await this.database.query(query);
            return rows;
        } catch (err) {
            console.error('Error en getPersona:', err);
            throw err;
        }
    }

    async getPersonaById(id) {
        const query = 'SELECT * FROM Persona WHERE id = ?';
        try {
            const [rows] = await this.database.query(query, [id]);
            return rows;
        } catch (err) {
            console.error('Error en getPersonaById:', err);
            throw err;
        }
    }

    async deletePersona(id) {
        const query = 'DELETE FROM Persona WHERE id = ?';
        try {
            const [result] = await this.database.query(query, [id]);
            return result;
        } catch (err) {
            console.error('Error en deletePersona:', err);
            throw err;
        }
    }

    async updatePersona(id, Nombres, Apellidos,Correo,Usuario, Contraseña) {
        const salt = crypto.randomBytes(16).toString('hex'); 
        const hash = crypto.pbkdf2Sync(Contraseña, salt, 1000, 64, 'sha512').toString('hex'); 
        try {
            const query = 'UPDATE Persona SET Nombre = ?,Apellidos = ?,Correo = ?, Usuario = ? , Contraseña = ? WHERE id = ?';
            const [result] = await this.database.query(query, [Nombres, Apellidos,Correo,Usuario,`${salt}:${hash}`, id]);
            return result;
        } catch (err) {
            console.error('Error en updatePersona:', err);
            throw err;
        }
    }

    async addPersona(Nombres, Apellidos,Correo,Usuario, Contraseña) {      
        const salt = crypto.randomBytes(16).toString('hex'); 
        const hash = crypto.pbkdf2Sync(Contraseña, salt, 1000, 64, 'sha512').toString('hex'); 

        try {
            const query = 'INSERT INTO Persona (Nombres , Apellidos ,Correo ,Usuario ,Contraseña) VALUES (?, ?, ?, ?, ?)';
            const [result] = await this.database.query(query, [Nombres , Apellidos ,Correo ,Usuario ,`${salt}:${hash}`]);
            return result;
        } catch (err) {
            console.error('Error en addPersona:' , err);
            throw err;
        }
    }
}

export default Persona;
