import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string; email: string }
}

export const isAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Non authentifié' })
      return
    }
    const token = authHeader.split(' ')[1]
    const secret = process.env.JWT_SECRET || 'secret'
    const decoded = jwt.verify(token, secret) as { id: string; role: string; email: string }
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token invalide ou expiré' })
    return
  }
}
