import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import router from './routes/app.js';
import session from 'express-session';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4321', // Cambia esto por el origen de tu frontend
  credentials: true, // Permite el uso de cookies y otros encabezados de credenciales
}));
app.use(helmet());
app.use(express.json());


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.', 
    headers: true, 
});

app.use(session({
    secret: process.env.SESSION_SECRET, // Llave secreta para firmar la cookie
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.SESSION_SECRET, // true en producción (requiere HTTPS)
      httpOnly: true, // Evita que el cliente acceda a la cookie (mejora la seguridad)
      maxAge: 60 * 60 * 1000, // 1 hora de expiración
      sameSite: 'lax' // Configura la política de SameSite
    }
  }));


app.use(limiter);
app.use('/api', router, limiter);
 
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});