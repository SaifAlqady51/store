import { Request, Response, NextFunction } from 'express';
import Error from '../interface/error.interface';

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Woops, something went wrong';

  res.status(status).json({ status, message });
  next();
};

export default errorMiddleware;
