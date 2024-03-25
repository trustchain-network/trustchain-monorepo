import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';

import appConfig from './config/app.config';
import { AllConfigType } from './config/config.type';
import { HomeModule } from './home/home.module';

import {
  ApiLoggerMiddleware,
  AuthMiddleware,
  JsonBodyMiddleware,
  RawBodyMiddleware,
} from './middleware/';

import {
  ApiKeysModule,
  AuditLogsModule,
  AuthModule,
  AuthAppleModule,
  AuthFacebookModule,
  AuthGoogleModule,
  AuthTwitterModule,
  DomainsModule,
  FilesModule,
  InvoicesModule,
  SessionsModule,
  TokensModule,
  MembershipsModule,
  MultiFactorAuthenticationModule,
  NfcCategoriesModule,
  NfcGroupsModule,
  NfcsModule,
  PlansModule,
  TeamsModule,
  UsersModule,
} from './modules/';

import appleConfig from './modules/auth-apple/config/apple.config';
import authConfig from './modules/auth/config/auth.config';
import databaseConfig from './providers/database/config/database.config';
import facebookConfig from './modules/auth-facebook/config/facebook.config';
import fileConfig from './modules/files/config/file.config';
import googleConfig from './modules/auth-google/config/google.config';
import twitterConfig from './modules/auth-twitter/config/twitter.config';

import mailConfig from './providers/mail/config/mail.config';
import minaConfig from './providers/mina/config/mina.config';
import s3Config from './providers/s3/config/s3.config';
import stripeConfig from './providers/stripe/config/stripe.config';
import twilioConfig from './providers/twilio/config/twilio.config';

import { DatabaseConfig } from './providers/database/config/database-config.type';
import {
  DnsModule,
  ElasticsearchModule,
  KeysModule,
  MailModule,
  MailerModule,
  MinaModule,
  S3Module,
  SdmModule,
  StripeModule,
  TwilioModule,
} from './providers/';

import {
  MongooseConfigService,
  TypeOrmConfigService,
} from './providers/database/';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        appleConfig,
        authConfig,
        databaseConfig,
        facebookConfig,
        fileConfig,
        googleConfig,
        mailConfig,
        minaConfig,
        s3Config,
        stripeConfig,
        twilioConfig,
        twitterConfig,
      ],
      envFilePath: ['.env'],
    }),
    (databaseConfig() as DatabaseConfig).isDocumentDatabase
      ? MongooseModule.forRootAsync({
          useClass: MongooseConfigService,
        })
      : TypeOrmModule.forRootAsync({
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
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
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
      imports: [ConfigModule.forRoot({})],
      inject: [ConfigService],
    }),
    ApiKeysModule,
    AuditLogsModule,
    AuthAppleModule,
    AuthFacebookModule,
    AuthGoogleModule,
    AuthModule,
    AuthTwitterModule,
    ElasticsearchModule,
    FilesModule,
    HomeModule,
    InvoicesModule,
    KeysModule,
    MailerModule,
    MailModule,
    MembershipsModule,
    MinaModule,
    MultiFactorAuthenticationModule,
    NfcCategoriesModule,
    NfcGroupsModule,
    NfcsModule,
    PlansModule,
    S3Module,
    SdmModule,
    SessionsModule,
    StripeModule,
    TeamsModule,
    TokensModule,
    TwilioModule,
    UsersModule,
    DomainsModule,
    DnsModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({
        path: '/webhooks/stripe',
        method: RequestMethod.POST,
      })
      .apply(JsonBodyMiddleware)
      .forRoutes('*')
      .apply(ApiLoggerMiddleware)
      .forRoutes('*')
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
