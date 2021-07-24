import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const connectUrl = process.env.MONGO_URL;
console.log(connectUrl);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(connectUrl),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
