import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./stregeties/jwt.strategy";

@Module({
	imports: [
		ConfigModule,
		PrismaModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					secret: configService.get("JWT_SECRET"),
					signOptions: {
						expiresIn: "2h",
					},
				};
			},
		}),
	],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService, PassportModule, JwtModule, JwtStrategy],
})
export class AuthModule {}
