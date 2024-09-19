import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado Authorization

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    // Si el token es válido, decodificamos el id y tipo de usuario
    req.userId = decoded.id;
    req.userType = decoded.tipoUsuario;
    next();
  });
};

export default verifyToken;
