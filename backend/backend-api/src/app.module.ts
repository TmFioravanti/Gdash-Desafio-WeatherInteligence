import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { WeatherModule } from './weather/weather.module';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'), // ✅ força pegar o .env do diretório atual
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI') ?? 'mongodb://mongo:27017/gdash',
      }),
    }),

    WeatherModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
