import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { HotelModule } from './hotel/hotel.module';
import { ReservationModule } from './reservation/reservation.module';
import { SupportRequestModule } from './support-request/support-request.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    HotelModule,
    ReservationModule,
    SupportRequestModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV');
        if (nodeEnv === 'test') {
          const mongod = await MongoMemoryServer.create();
          const uri = mongod.getUri();
          return {
            uri: uri,
          };
        } else {
          return {
            uri: configService.get<string>('DATABASE_PATH'),
          };
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
