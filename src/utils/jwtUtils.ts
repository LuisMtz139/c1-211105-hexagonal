import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const generateToken = (user_id: string | number): string => {
    // Convierte user_id a string si es un número
    const userIdAsString = typeof user_id === 'number' ? user_id.toString() : user_id.toString();
    
    const expiration_date = Math.floor(Date.now() / 1000) + 3600; // Expira en 1 hora
    
    const payload = {
      user_id: userIdAsString,  // Usa el ID del usuario en forma de cadena
      exp: expiration_date,
    };
    
    const token = jwt.sign(payload, 'IxAH7SjefD_IfpquIJP2a3ukYMs0E0s4MU-44jAgxSI', {
      algorithm: 'HS256',
    });
    
    return token;
  };
  

const verifyToken = (token: string): string | null => {
  try {
    const payload: any = jwt.verify(token, 'IxAH7SjefD_IfpquIJP2a3ukYMs0E0s4MU-44jAgxSI', {
      algorithms: ['HS256'],
    });
    const user_id = payload.user_id;
    return user_id;
  } catch (error) {
    return null;
  }
};
//verificar 
const tokenRequired = (req: Request, res: Response, next: NextFunction): void => {
  let token: string | null = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ message: 'Token de acceso faltante' });
    return;
  }

  const user_id = verifyToken(token);

  if (!user_id) {
    res.status(401).json({ message: 'Token de acceso inválido' });
    return;
  }

  // Puedes realizar validaciones adicionales aquí según tus necesidades

  next();
};

export { generateToken, verifyToken, tokenRequired };
