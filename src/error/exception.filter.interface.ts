import { NextFunction, Request, Response } from 'express';
import { HTTPError } from './http.error';

export interface ExceptionFilterInterface {
	catch: (err: Error | HTTPError, req: Request, res: Response, next: NextFunction) => void;
}
