import { MiddlewareConsumer, Module, NestModule, Search } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BooksModule } from 'src/modules/books/books.module';
import { databaseConfig } from 'src/config/db.config';
import { UserModule } from 'src/modules/users/users.module';
import { MailModule } from 'src/mails/mail.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from 'src/modules/Payment/payment.module';
import { NotificationModule } from 'src/modules/notification/notification.module';
import { LoggerMiddleware } from 'src/middleware/Logging-middleware';
import { SearchHistory } from 'src/entities/search-history';
import { CacheModule } from '@nestjs/cache-manager';
import { CommentModule } from 'src/modules/comment/comment.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),

    CacheModule.register({
      isGlobal: true,
      ttl: 300, 
    }),
  
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
    }),
    UserModule,
    BooksModule,
    MailModule,
    PaymentModule,
    NotificationModule,
    CommentModule,
    TypeOrmModule.forFeature([SearchHistory])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}