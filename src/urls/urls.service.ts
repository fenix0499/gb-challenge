import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { DecodeUrlDto } from "./dto/decode-url.dto";
import { EncodeUrlDto } from "./dto/encode-url.dto";

@Injectable()
export class UrlsService {
	constructor(private readonly prismaService: PrismaService) {}
	async encode(userId: User["id"], encodeUrlDto: EncodeUrlDto) {
    try {
      const urlExists = await this.prismaService.urls.findUnique({
        where: {
          url: encodeUrlDto.url,
        },
      });
  
      if (urlExists) return { encodedUrl: urlExists.encodedUrl };
  
      const shortUrl = this.generateEncodedUrl(encodeUrlDto.url);
  
      const { encodedUrl } = await this.prismaService.urls.create({
        data: {
          url: encodeUrlDto.url,
          encodedUrl: shortUrl,
          userId,
        },
      });
  
      return {
        encodedUrl,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
	}

	async decode(decodeUrlDto: DecodeUrlDto) {
		const shortUrlExists = await this.prismaService.urls.findUnique({
			where: {
				encodedUrl: decodeUrlDto.encodedUrl,
			},
		});

		if (!shortUrlExists) throw new NotFoundException("Short url not found...");

		const { url: decodedUrl } = shortUrlExists;

		return {
			decodedUrl,
		};
	}

	generateEncodedUrl(url: string) {
		const shortUrlLength = 8;
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		let shortUrl = "https://bit.ly/";
		for (let i = 0; i < shortUrlLength; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			shortUrl += characters.charAt(randomIndex);
		}

		return shortUrl;
	}
}
