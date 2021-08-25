import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EventsModule } from '../Events/events.module';
import { UsersModule } from '../Users/users.module';
import { AuthModule } from '../Auth/auth.module';
import { AppController } from './app.controller';
import { join } from 'path';

const connectUrl = process.env.MONGO_URL;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'static'),
    }),
    EventsModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(connectUrl),
  ],
  controllers: [AppController],
})
export class AppModule {}
