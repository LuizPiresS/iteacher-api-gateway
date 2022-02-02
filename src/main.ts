import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as momentTimeZone from 'moment-timezone';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { configService } from './config/config.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());

  Date.prototype.toJSON = function (): any {
    return momentTimeZone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH-mm-ss.SSS');
  };
  const configSwagger = new DocumentBuilder()
    .setTitle('Iteacher API gateway')
    .setVersion('0.0.1')
    .build();

  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('documentation', app, documentSwagger);

  app.useGlobalPipes(new ValidationPipe());

  const logger = new Logger('Main');

  await app.listen(configService.getPort());

  logger.log(
    `Application is running in -->production<-- mod: ${configService.isProduction()}`,
  );
}

bootstrap();
