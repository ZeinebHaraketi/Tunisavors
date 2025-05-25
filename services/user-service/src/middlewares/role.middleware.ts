import { Response, NextFunction } from 'express'
import { AuthenticatedRequest } from './auth.middleware'

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const user = req.user
    if (!user || !allowedRoles.includes(user.role)) {
      res.status(403).json({ message: 'Accès interdit : rôle non autorisé' })
      return
    }
    next()
  }
}
