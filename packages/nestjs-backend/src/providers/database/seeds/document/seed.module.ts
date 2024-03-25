import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/providers/database/config/database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from 'src/providers/database/mongoose-config.service';
import { UserSeedModule } from './user/user-seed.module';

@Module({
  imports: [
    UserSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
})
export class SeedModule {}
