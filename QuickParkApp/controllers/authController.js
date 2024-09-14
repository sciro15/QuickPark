import bcrypt from 'bcrypt';
import db from '../database/db.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

// Verifica el contenido de la contraseña y el hash
const comparePasswords = async (plainTextPassword, hashedPassword) => {
  console.log('Contraseña en texto plano:', plainTextPassword);
  console.log('Contraseña hasheada:', hashedPassword);

  try {
    // bcrypt.compare compara directamente la contraseña ingresada con la almacenada
    if (!plainTextPassword || !hashedPassword) {
      throw new Error('Contraseña en texto plano o hash de contraseña no proporcionados');
    }
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    console.log('Resultado de la comparación:', isMatch); // Log para verificar el resultado
    return isMatch;
  } catch (error) {
    console.error('Error al comparar contraseñas:', error);
    throw error;
  }
};

const authenticateUser = async (req, res) => {
  console.log('Datos de la solicitud:', req.body);
  
  const { Usuario, Contraseña } = req.body;
  console.log(Usuario, Contraseña); //
  try {
    // Buscar en la tabla de Administrador
    const [admin] = await db.query('SELECT * FROM Administrador WHERE Usuario = ?', [Usuario]);

    if (admin && admin.length > 0) {
      const adminRecord = admin[0];
      console.log('Registro de administrador:', adminRecord); // Verifica el contenido del registro
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
      console.log('Registro de persona:', personaRecord); // Verifica el contenido del registro
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
