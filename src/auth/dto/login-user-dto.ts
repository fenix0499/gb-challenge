import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import {
	IsEmail,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from "class-validator";

export class LoginUserDto
	implements Omit<User, "id" | "createdAt" | "firstName" | "lastName">
{
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
