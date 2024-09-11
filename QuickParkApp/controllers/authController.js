import bcrypt from 'bcrypt';
import db from '../database/db.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

// Cantidad de rondas de salt (10 es un valor razonable)


const comparePasswords = async (plainTextPassword, hashedPassword) => {
  try {
    // bcrypt.compare compara directamente la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    console.log('Resultado de la comparación:', isMatch); // Log para verificar el resultado
    return isMatch;
  } catch (error) {
    console.error('Error al comparar contraseñas:', error);
    throw error;
  }
};

const authenticateUser = async (req, res) => {
  console.log(req.body);

  const { Usuario, Contraseña } = req.body;

  try {
    // Buscar en la tabla de Administrador
    const [admin] = await db.query('SELECT * FROM Administrador WHERE Usuario = ?', [Usuario]);

    if (admin && admin.length > 0) {
      const adminRecord = admin[0];
      const isPasswordValid = await comparePasswords(Contraseña, adminRecord.Contraseña);

      if (isPasswordValid) {
        const token = jwt.sign({ id: adminRecord.id, tipoUsuario: 'Administrador' }, process.env.SECRET_KEY, { expiresIn: '1h' });
        req.session.token = token; // Guardar el token en la sesión

        return res.json({ message: 'Autenticado correctamente' });
      }
    }

    // Buscar en la tabla de Persona
    const [persona] = await db.query('SELECT * FROM Persona WHERE Usuario = ?', [Usuario]);

    if (persona && persona.length > 0) {
      const personaRecord = persona[0];
      const isPasswordValid = await comparePasswords(Contraseña, personaRecord.Contraseña);

      if (isPasswordValid) {
        const token = jwt.sign({ id: personaRecord.id, tipoUsuario: 'Persona' }, process.env.SECRET_KEY, { expiresIn: '1h' });
        req.session.token = token;
        return res.json({ message: 'Autenticado correctamente' });
      }
    }

    // Si no coincide ningún usuario o contraseña
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  } catch (error) {
    console.error('Error al autenticar:', error);
    return res.status(500).json({ message: 'Error al autenticar', error });
  }
};

export default authenticateUser;
