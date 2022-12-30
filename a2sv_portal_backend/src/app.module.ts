import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CaslModule } from './casl/casl.module'
import { ProblemModule } from './app/problem/problem.module'
import { TagModule } from './app/tag/tag.module'
import { TopicModule } from './app/topic/topic.module'
import { UserProfileModule } from './app/user-profile/user-profile.module'
import { PrismaModule } from './prisma/prisma.module'
// import { DataAnalyticsModule } from './data-analytics/data-analytics.module'
import { ScheduleModule } from '@nestjs/schedule'
import { ServicesModule } from './services/services.module'
import { MailModule } from './mail/mail.module'
import { MailerModule } from '@nestjs-modules/mailer'

@Module({
  imports: [
    MailerModule.forRoot({
    // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
    // or
    transport: {
      host: 'smtp.socketlabs.com',
      secure: false,
      auth: {
        user: 'server42224',
        pass: 'Zm5i8TNp3k9R6DxY',
      },
    }}),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: '*',
        credentials: true,
      },
      context: ({ req, res }) => ({
        req,
        res,
      }),
      driver: ApolloDriver,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,

      debug: true,
      introspection: true,
      autoSchemaFile: true,

      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      resolvers: { DateTime: GraphQLISODateTime },
    }),
    MailModule,
    AuthModule,
    PrismaModule,
    CaslModule,
    TagModule,
    ProblemModule,
    TopicModule,
    UserProfileModule,
    PrismaModule,
    CaslModule,
    ServicesModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
