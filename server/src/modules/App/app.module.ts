import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from '../Events/events.module';
import { UsersModule } from '../Users/users.module';
import { AuthModule } from '../Auth/auth.module';

const connectUrl = process.env.MONGO_URL;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    EventsModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(connectUrl),
  ],
  controllers: [],
})
export class AppModule {}
