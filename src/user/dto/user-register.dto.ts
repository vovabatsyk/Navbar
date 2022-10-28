import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Wrong Email!' })
	email!: string;

	@IsString({ message: 'Do not enter a Password' })
	password!: string;

	@IsString({ message: 'Do not enter a Name' })
	name!: string;
}
