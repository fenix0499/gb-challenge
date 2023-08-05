import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

type ValidatedUser = Omit<User, "password">;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly prismaService: PrismaService,
		configService: ConfigService,
	) {
		super({
			secretOrKey: configService.get("JWT_SECRET"),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}
	async validate(payload: JwtPayload): Promise<ValidatedUser> {
		const { id } = payload;

		const user = await this.prismaService.user.findUnique({
			where: { id },
		});
		
		if (!user) throw new UnauthorizedException("Token not valid");

		const { password, ...resultUser } = user;

		return resultUser as ValidatedUser;
	}
}
