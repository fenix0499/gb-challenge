import { Module } from "@nestjs/common";
import { UrlsService } from "./urls.service";

@Module({
	providers: [UrlsService],
	exports: [UrlsService],
})
export class UrlsModule {}
