import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ error: err.serializeErrors() });
  }

  console.error(err);
  res.status(404).send({ error: [{ message: 'Something went wrong' }] });
}
