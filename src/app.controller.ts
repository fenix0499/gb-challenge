import { Body, Controller, Post, UseGuards, Query, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";
import { AuthService } from "./auth/auth.service";
import { GetUser } from "./auth/decorators/get-user-decorator";
import { CreateUserDto } from "./auth/dto/create-user.dto";
import { LoginUserDto } from "./auth/dto/login-user-dto";
import { UrlsService } from "./urls/urls.service";
import { EncodeUrlDto } from "./urls/dto/encode-url.dto";
import { DecodeUrlDto } from "./urls/dto/decode-url.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Geekbears Challenge')
@Controller()
export class AppController {
	constructor(
		private readonly authService: AuthService,
		private readonly urlsService: UrlsService
	) {}

	@Post("/signup")
	signup(@Body() createUserDto: CreateUserDto) {
		return this.authService.create(createUserDto);
	}

	@Post("/login")
	login(@Body() loginUserDto: LoginUserDto) {
		return this.authService.login(loginUserDto);
	}

	@UseGuards(AuthGuard())
	@Post("/encode")
	encode(@GetUser() user: User, @Query() encodeUrlDto: EncodeUrlDto) {
		console.log('🚀 ~ file: app.controller.ts:26 ~ AppController ~ encode ~ user:', user);
		return this.urlsService.encode(user.id, encodeUrlDto);
	}

	@UseGuards(AuthGuard())
	@Get("/decode")
	decode(@Query() decodeUrlDto: DecodeUrlDto) {
		return this.urlsService.decode(decodeUrlDto)
	}
}
