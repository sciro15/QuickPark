import crypto from 'crypto';
import db from '../database/db.js'; // Asegúrate de tener tu conexión a la base de datos aquí
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();


const comparePasswords = (plainTextPassword, hashedPassword) => {
    // Separar el salt y el hash almacenado
    const [salt, originalHash] = hashedPassword.split(':');
    
    // Generar el hash a partir de la contraseña proporcionada y el salt almacenado
    const hashedBuffer = crypto.pbkdf2Sync(plainTextPassword, salt, 1000, 64, 'sha512');
    
    // Comparar el hash generado con el hash almacenado
    return originalHash === hashedBuffer.toString('hex');
  };

// Autenticación del usuario
const authenticateUser = async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    // Buscar en la tabla de Administrador
    const [admin] = await db.query('SELECT * FROM Administrador WHERE Usuario = ?', [usuario]);

    if (admin) {
      if (comparePasswords(contraseña, admin.Contraseña)) {
        const token = jwt.sign({ id: admin.id, tipoUsuario: 'Administrador' }, process.env.SECRET_KEY , { expiresIn: '1h' });
        return res.json({ token, tipoUsuario: 'Administrador' });
      }
    }

    // Buscar en la tabla de Persona
    const [persona] = await db.query('SELECT * FROM Persona WHERE Usuario = ?', [usuario]);

    if (persona) {
      if (comparePasswords(contraseña, persona.Contraseña)) {
        const token = jwt.sign({ id: persona.id, tipoUsuario: 'Persona' }, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token, tipoUsuario: 'Persona' });
      }
    }

    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  } catch (error) {
    res.status(500).json({ message: 'Error al autenticar', error });
  }
};

export default authenticateUser;