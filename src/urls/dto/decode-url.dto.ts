import { ApiProperty } from "@nestjs/swagger";
import { Urls } from "@prisma/client";
import { IsString, IsUrl } from "class-validator";

export class DecodeUrlDto implements Pick<Urls, 'encodedUrl'> {
	@ApiProperty()
	@IsString()
	@IsUrl()
	encodedUrl: string;
}
