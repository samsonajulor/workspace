import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ResponseTimeoutInterceptor } from './common/interceptors/response-timeout.interceptor'
import { WrapResponseInterceptor } from './common/interceptors/wrap-rsponse.interceptor'

async function bootstrap() {
  const API_PREFIX = 'api' // global prefix for api
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  app.setGlobalPrefix(API_PREFIX)

  // global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validateCustomDecorators: true,
    }),
  )
  // global interceptors
  app.useGlobalInterceptors(new WrapResponseInterceptor(), new ResponseTimeoutInterceptor())

  // Setting up Swagger document
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  /** NOTE:
   * Swagger uses plugin for auto generate of api docs and reduce swagger decorators in code.
   * plugin config is specified in nest-cli.json
   */
  SwaggerModule.setup(`${API_PREFIX}/docs`, app, document)

  await app.listen(configService.get('app.port'))
}
bootstrap()
