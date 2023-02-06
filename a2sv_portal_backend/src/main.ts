import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { PrismaService } from './prisma/prisma.service'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.enableCors({ credentials: true })
  app.use(cookieParser('a2sv-portal-secret'))
  await app.listen(process.env.PORT || 3000)
}

bootstrap()
