import { Module } from '@nestjs/common';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from 'src/config/config.type';
import { FactoryModule } from '#test/factory/factory.module';
import { TypeOrmConfigService } from 'src/providers/database/typeorm-config.service';
import fileConfig from 'src/modules/files/config/file.config';
import databaseConfig from 'src/providers/database/config/database.config';
import authConfig from 'src/modules/auth/config/auth.config';
import appConfig from 'src/config/app.config';
import mailConfig from 'src/providers/mail/config/mail.config';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, mailConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: {
          path: path.join(__dirname, '../../src/i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    FactoryModule,
    AuthModule,
  ],
})
export class TestModule {}
