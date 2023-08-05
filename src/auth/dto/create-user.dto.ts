import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto implements Omit<User, 'id' | 'createdAt'> {
	@ApiProperty()
	@IsString()
	@MinLength(3)
	firstName: string;

	@ApiProperty()
	@IsString()
	@MinLength(3)
	lastName: string;

	@ApiProperty()
	@IsString()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	@MinLength(6)
	@MaxLength(50)
	@Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message:
			"The password must have a Uppercase, lowercase letter and a number",
	})
	password: string;
}
