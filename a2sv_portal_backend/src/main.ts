import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { PrismaService } from './prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  app.enableCors()
  app.use(cookieParser('a2sv-portal-secret'))
  await app.listen(process.env.PORT || 3000)
}

bootstrap()
