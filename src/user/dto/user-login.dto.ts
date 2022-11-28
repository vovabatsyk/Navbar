import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Не правильний Email!' })
	email: string | undefined;

	@IsString({ message: 'Не правильно введений тип пароля' })
	password: string | undefined;
}
