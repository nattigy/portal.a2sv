import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { AppResolver } from './app.resolver'
import { AppService } from './app.service'
import { AuthModule } from './app/auth/auth.module'
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
import { join } from 'path'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import {
  UsersUpdateTopicComfortabilityModule,
} from './services/users-update-topic-comfortability/users-update-topic-comfortability.module'
import {
  UsersUpdateProblemStatusModule
} from './services/users-update-problem-status/users-update-problem-status.module'
import { StudentDataAnalyticsModule } from './app/user-group-season-analytics/student-data-analytics.module'

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.socketlabs.com',
        secure: false,
        auth: {
          user: process.env.SOCKET_LABS_USER_NAME,
          pass: process.env.SOCKET_LABS_PASSWORD,
        },
      },
      template: {
        dir: join(__dirname, '../mail/template'),
        adapter: new HandlebarsAdapter(),
      },
    }),
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
    ServicesModule,
    UsersUpdateProblemStatusModule,
    UsersUpdateTopicComfortabilityModule,
    StudentDataAnalyticsModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {
}
