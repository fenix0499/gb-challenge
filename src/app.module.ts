import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UrlsModule } from "./urls/urls.module";

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, PrismaModule, UrlsModule],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
