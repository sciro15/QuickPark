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

    async updateAdministrador(id, Nombres, Apellidos, Correo) {
        try {
            const query = `
                UPDATE Administrador 
                SET Nombres = ?, Apellidos = ?, Correo = ? 
                WHERE id = ?
            `;
            
            // Construir los parámetros dinámicamente
            const params = [Nombres, Apellidos, Correo, id]; // Agregar id a los parámetros
    
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
            // Verificar si el usuario ya existe
            const userCheckQuery = 'SELECT COUNT(*) as count FROM Administrador WHERE Usuario = ?';
            const [userCheckResult] = await this.database.query(userCheckQuery, [Usuario]);
    
            if (userCheckResult[0].count > 0) {
                throw new Error('El usuario ya existe.');
            }
    
            // Verificar si el correo ya existe
            const emailCheckQuery = 'SELECT COUNT(*) as count FROM Administrador WHERE Correo = ?';
            const [emailCheckResult] = await this.database.query(emailCheckQuery, [Correo]);
    
            if (emailCheckResult[0].count > 0) {
                throw new Error('El correo electrónico ya existe.');
            }
    
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
