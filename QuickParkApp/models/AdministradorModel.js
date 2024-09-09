import crypto from 'crypto';
class Administrador {
    constructor(database) {
        this.database = database;
    } 

    async getAdministrador() {
        const query = 'SELECT * FROM Administrador';
        try {
            const [rows] = await this.database.query(query);
            return rows;
        } catch (err) {
            console.error('Error en getAdministrador:', err);
            throw err;
        }
    }

    async getAdministradorById(id) {
        const query = 'SELECT * FROM Administrador WHERE id = ?';
        try {
            const [rows] = await this.database.query(query, [id]);
            return rows;
        } catch (err) {
            console.error('Error en getAdministradorById:', err);
            throw err;
        }
    }

    async deleteAdministrador(id) {
        const query = 'DELETE FROM Administrador WHERE id = ?';
        try {
            const [result] = await this.database.query(query, [id]);
            return result;
        } catch (err) {
            console.error('Error en deleteAdministrador:', err);
            throw err;
        }
    }

    async updateAdministrador(id, Nombres, Apellidos,Correo,Usuario, Contraseña) {
        const salt = crypto.randomBytes(16).toString('hex'); 
        const hash = crypto.pbkdf2Sync(Contraseña, salt, 1000, 64, 'sha512').toString('hex'); 
        try {
            const query = 'UPDATE Administrador SET Nombre = ?,Apellidos = ?,Correo = ?, Usuario = ? , Contraseña = ? WHERE id = ?';
            const [result] = await this.database.query(query, [Nombres, Apellidos,Correo,Usuario,`${salt}:${hash}`, id]);
            return result;
        } catch (err) {
            console.error('Error en updateAdministrador:', err);
            throw err;
        }
    }

    async addAdministrador(Nombres, Apellidos,Correo,Usuario, Contraseña) {      
        const salt = crypto.randomBytes(16).toString('hex'); 
        const hash = crypto.pbkdf2Sync(Contraseña, salt, 1000, 64, 'sha512').toString('hex'); 

        try {
            const query = 'INSERT INTO Administrador (Nombres , Apellidos ,Correo ,Usuario ,Contraseña) VALUES (?, ?, ?, ?, ?)';
            const [result] = await this.database.query(query, [Nombres , Apellidos ,Correo ,Usuario ,`${salt}:${hash}`]);
            return result;
        } catch (err) {
            console.error('Error en addPersona:' , err);
            throw err;
        }
    }
}

export default Administrador;
