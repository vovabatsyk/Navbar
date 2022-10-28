import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classValidate: ClassConstructor<object>) {}

	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToClass(this.classValidate, body);
		validate(instance).then((errors) => {
			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
