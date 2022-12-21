import { NestFactory, Reflector } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import fastifySecureSession from '@fastify/secure-session'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from 'app/app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  )

  app.enableCors({ credentials: true })

  const config = new DocumentBuilder()
    .setVersion(process.env.VERSION as string)
    .addCookieAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup(``, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      layout: `BaseLayout`,
      displayRequestDuration: true,
    },
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  await app.register(fastifySecureSession, {
    secret: process.env.COOKIE_SECRET as string,
    salt: process.env.COOKIE_SALT as string,
  })

  await app.listen(8000, process.env.NEST_ADDRESS || ``)
}
bootstrap()
