import bcrypt from 'bcrypt';
import db from '../database/db.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

// Comparar contraseñas con bcrypt
const comparePasswords = async (plainTextPassword, hashedPassword) => {
  if (!plainTextPassword || !hashedPassword) {
    throw new Error('Contraseña en texto plano o hash de contraseña no proporcionados');
  }
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Generar el token JWT
const generateToken = (userId, userType) => {
  return jwt.sign(
    { id: userId, tipoUsuario: userType },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
};

// Autenticar usuario y guardar el token en la cookie
const authenticateUser = async (req, res) => {
  const { Usuario, Contraseña } = req.body;

  if (!Usuario || !Contraseña) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
  }

  try {
    // Función para buscar el usuario en las tablas Administrador y Persona
    const findUser = async (table) => {
      const [result] = await db.query(`SELECT * FROM ${table} WHERE Usuario = ?`, [Usuario]);
      return result.length > 0 ? result[0] : null;
    };

    // Intentar encontrar al usuario en la tabla de Administradores
    let user = await findUser('Administrador');
    if (user) {
      const isPasswordValid = await comparePasswords(Contraseña, user.Contraseña);
      if (isPasswordValid) {
        const token = generateToken(user.id, 'Administrador');
        
        // Guardar el token en una cookie HTTP-Only
        res.cookie('jwt_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Solo usar cookies seguras en producción
          maxAge: 3600000 // 1 hora
        });
        
        return res.json({ token, message: 'Autenticado correctamente como Administrador' });
      }
    }

    // Intentar encontrar al usuario en la tabla de Personas
    user = await findUser('Persona');
    if (user) {
      const isPasswordValid = await comparePasswords(Contraseña, user.Contraseña);
      if (isPasswordValid) {
        const token = generateToken(user.id, 'Persona');
        
        // Guardar el token en una cookie HTTP-Only
        res.cookie('jwt_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Solo usar cookies seguras en producción
          maxAge: 3600000 // 1 hora
        });
        
        return res.json({ token, message: 'Autenticado correctamente como Persona' });
      }
    }

    // Si ningún usuario coincide o la contraseña no es válida
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  } catch (error) {
    console.error('Error al autenticar:', error);
    return res.status(500).json({ message: 'Error al autenticar', error });
  }
};

// Obtener los datos de la sesión a partir del token en la cookie
const getSessionData = (req, res) => {
  // Verifica si el usuario ha sido autenticado y el token fue verificado en el middleware
  if (!req.user) {
    return res.status(401).json({ message: 'No se encontró un usuario autenticado' });
  }

  // Extrae los datos del usuario del token JWT decodificado
  const { id, tipoUsuario } = req.user;

  // Enviar los datos de sesión al cliente
  return res.json({
    isAuthenticated: true,  // Indica que el usuario está autenticado
    tipoUsuario,            // El tipo de usuario (ej. 'Administrador', 'Persona')
    verificado: true,       // El token ha sido verificado correctamente
    id                      // ID del usuario autenticado
  });

};

const logoutUser = (req, res) => {
  // Eliminar la cookie jwt_token
  res.clearCookie('jwt_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Asegúrate de que sea segura en producción
    path: '/', // Asegúrate de que el path sea correcto
  });

  // Devolver una respuesta al cliente
  return res.json({ message: 'Sesión cerrada correctamente' });
};

export { authenticateUser, getSessionData, logoutUser };
