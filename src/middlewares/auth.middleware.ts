import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import httpResponse from '../utils/http.response';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return httpResponse(res, 401, { mensagem: 'Token not provided.' });
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    return httpResponse(res, 401, { mensagem: 'Malformatted token.' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('Internal server error: JWT_SECRET missing');
    }

    const decoded = jwt.verify(token, secret) as { id: string };

    req.userId = decoded.id;

    return next();
    
  } catch (error) {
    return httpResponse(res, 401, { mensagem: 'Invalid or expired token.' });
  }
};