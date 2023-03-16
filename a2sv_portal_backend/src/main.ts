import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true
  // }))
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  app.enableCors({ credentials: true })
  app.use(cookieParser('a2sv-portal-secret'))
  app.use(new ValidationPipe())
  await app.listen(process.env.PORT || 3000)
}

bootstrap()
