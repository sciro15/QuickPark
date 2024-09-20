import bcrypt from 'bcrypt';
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

    async updateAdministrador(id, Nombres, Apellidos, Correo, Usuario, Contraseña) {
        try {
            const saltRounds = 10;
            // Generar el hash de la nueva contraseña si se proporciona una
            let hashedPassword;
            if (Contraseña) {
                hashedPassword = await bcrypt.hash(Contraseña, saltRounds);
            }
    
            const query = `
                UPDATE Administrador 
                SET Nombre = ?, Apellidos = ?, Correo = ?, Usuario = ? ${Contraseña ? ', Contraseña = ?' : ''} 
                WHERE id = ?
            `;
            
            // Construir los parámetros dinámicamente
            const params = [Nombres, Apellidos, Correo, Usuario];
            if (hashedPassword) {
                params.push(hashedPassword);
            }
            params.push(id);
    
            const [result] = await this.database.query(query, params);
            return result;
        } catch (err) {
            console.error('Error en updateAdministrador:', err);
            throw err;
        }
    }

    async addAdministrador(Nombres, Apellidos, Correo, Usuario, Contraseña) {
        const saltRounds = 10;
        try {
            // Generar el hash de la contraseña usando bcrypt
            const hashedPassword = await bcrypt.hash(Contraseña, saltRounds);
    
            const query = 'INSERT INTO Administrador (Nombres, Apellidos, Correo, Usuario, Contraseña) VALUES (?, ?, ?, ?, ?)';
            const [result] = await this.database.query(query, [Nombres, Apellidos, Correo, Usuario, hashedPassword]);
            return result;
        } catch (err) {
            console.error('Error en addAdministrador:', err);
            throw err;
        }
    }
}

export default Administrador;
