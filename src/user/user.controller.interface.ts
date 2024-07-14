import { NextFunction, Request, Response } from 'express';

export interface UserControllerInterface {
	register: (res: Request, req: Response, next: NextFunction) => void;
	login: (req: Request, res: Response, next: NextFunction) => void;
}
