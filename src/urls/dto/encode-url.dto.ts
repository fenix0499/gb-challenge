import { ApiProperty } from "@nestjs/swagger";
import { Urls } from "@prisma/client";
import { IsString, IsUrl } from "class-validator";

export class EncodeUrlDto implements Pick<Urls, 'url'> {
	@ApiProperty()
	@IsString()
	@IsUrl()
	url: string;
}
