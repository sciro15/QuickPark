import bcrypt from 'bcrypt'
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

    async updatePersona(id, Nombres, Apellidos, Correo, Usuario, Contraseña) {
        const saltRounds = 10;        
        try {
          let hashedPassword;
          if (Contraseña) {
            // Generar el hash de la nueva contraseña si se proporciona
            hashedPassword = await bcrypt.hash(Contraseña, saltRounds);
          }
      
          // Actualizar los datos
          const query = `
            UPDATE Persona 
            SET Nombres = ?, Apellidos = ?, Correo = ?, Usuario = ? ${Contraseña ? ', Contraseña = ?' : ''} 
            WHERE id = ?
          `;
          
          // Prepara los parámetros de la consulta
          const params = [Nombres, Apellidos, Correo, Usuario];
          if (hashedPassword) {
            params.push(hashedPassword);
          }
          params.push(id);
      
          const [result] = await this.database.query(query, params);
          return result;
        } catch (err) {
          console.error('Error en updatePersona:', err);
          throw err;
        }
      }

    async addPersona(Nombres, Apellidos, Correo, Usuario, Contraseña) {
        const saltRounds = 10;
        try {
          // Generar el hash de la contraseña
          const hashedPassword = await bcrypt.hash(Contraseña, saltRounds);
      
          const query = 'INSERT INTO Persona (Nombres, Apellidos, Correo, Usuario, Contraseña) VALUES (?, ?, ?, ?, ?)';
          const [result] = await this.database.query(query, [Nombres, Apellidos, Correo, Usuario, hashedPassword]);
          return result;
        } catch (err) {
          console.error('Error en addPersona:', err);
          throw err;
        }
      }
}

export default Persona;
