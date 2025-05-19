import { Request, Response, NextFunction } from 'express';

export function checkAdmin(req: Request, res: Response, next: NextFunction): void {
  const user = req.session.user;

  if (user?.role === 'Administrador') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado. Solo administradores.' });
  }
}
