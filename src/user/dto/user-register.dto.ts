import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Не правильний Email.' })
	email!: string;

	@IsString({ message: 'Не правильно введений тип пароля.' })
	password!: string;

	@IsString({ message: 'Не правильно введений тип імені.' })
	name!: string;
}
