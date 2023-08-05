import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const logger = new Logger();
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix("api/v1");

	app.enableCors({
		origin: "*", // Origen permitido
		methods: "GET,PUT,PATCH,POST,", // Métodos permitidos
		credentials: true, // Habilita el envío de cookies y encabezados de autenticación
		allowedHeaders: "Authorization,Origin,Content-Type,Accept", // Encabezados permitidos
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

  const config = new DocumentBuilder()
		.setTitle("GeekBears Challenge REST API")
		.setDescription("Endpoints Documentation")
		.setVersion("1.0")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api/v1", app, document);

	await app.listen(process.env.PORT || 3000);
	logger.debug(`App running on port ${await app.getUrl()}`);
}
bootstrap();
