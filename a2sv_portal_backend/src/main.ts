import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  app.enableCors()
  app.use(cookieParser('a2sv-portal-secret'))
  await app.listen(process.env.PORT || 3000)
}

bootstrap()
