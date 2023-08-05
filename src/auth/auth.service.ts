import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user-dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async create(createUserDto: CreateUserDto) {
		try {
			const { password, ...userData } = createUserDto;
			const {
				password: hashedPassword,
				id,
				...user
			} = await this.prismaService.user.create({
				data: {
					...userData,
					password: await bcrypt.hashSync(password, 10),
				},
			});

			return {
				user,
				token: this.getJwtToken({ id }),
			};
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async login(loginUserDto: LoginUserDto) {
		const { email, password } = loginUserDto;

		const userExisting = await this.prismaService.user.findUnique({
			where: { email },
		});

		if (!userExisting) throw new UnauthorizedException("User not found...");

		if (!(await bcrypt.compare(password, userExisting.password)))
			throw new BadRequestException("Invalid credentials");

    const { password: ps, id, ...user} = userExisting;
		
    return { ...user, token: this.getJwtToken({ id }) };
	}

	private getJwtToken(payload: { id: string }) {
		const token = this.jwtService.sign(payload);
		return token;
	}
}
