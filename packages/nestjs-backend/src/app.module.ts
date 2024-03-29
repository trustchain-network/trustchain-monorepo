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

import appleConfig from './modules/auth-apple/config/apple.config';
import authConfig from './modules/auth/config/auth.config';
import databaseConfig from './providers/database/config/database.config';
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
  MongooseConfigService,
  TypeOrmConfigService,
} from './providers/database/';

//middlewares
import { JsonBodyMiddleware } from './middleware/json-body.middleware';
import { ApiLoggerMiddleware } from './middleware/api-logger.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RawBodyMiddleware } from './middleware/raw-body.middleware';

// Providers
import { DnsModule } from './providers/dns/dns.module';
import { ElasticsearchModule } from './providers/elasticsearch/elasticsearch.module';
import { KeysModule } from './providers/keys/keys.module';
import { MailModule } from './providers/mail/mail.module';
import { MailerModule } from './providers/mailer/mailer.module';
import { MinaModule } from './providers/mina/mina.module';
import { S3Module } from './providers/s3/s3.module';
import { SdmModule } from './providers/sdm/sdm.module';
import { StripeModule } from './providers/stripe/stripe.module';
import { TwilioModule } from './providers/twilio/twilio.module';

// Modules
import { ApiKeysModule } from './modules/api-keys/api-keys.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { AuthAppleModule } from './modules/auth-apple/auth-apple.module';
import { AuthGoogleModule } from './modules/auth-google/auth-google.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthTwitterModule } from './modules/auth-twitter/auth-twitter.module';
import { MultiFactorAuthenticationModule } from './modules/multi-factor-authentication/multi-factor-authentication.module';
import { NfcCategoriesModule } from './modules/nfc-categories/nfc-categories.module';
import { NfcGroupsModule } from './modules/nfc-groups/nfc-groups.module';
import { PlansModule } from './modules/plans/plans.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { TeamsModule } from './modules/teams/teams.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { DomainsModule } from './modules/domains/domains.module';
import { FilesModule } from './modules/files/files.module';
import { NfcsModule } from './modules/nfcs/nfcs.module';
import { NfcDetailsModule } from './modules/nfc-details/nfc-details.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        appleConfig,
        authConfig,
        databaseConfig,
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
    AuthGoogleModule,
    AuthModule,
    AuthTwitterModule,
    ElasticsearchModule,
    FilesModule,
    HomeModule,
    KeysModule,
    MailerModule,
    MailModule,
    MinaModule,
    MultiFactorAuthenticationModule,
    NfcCategoriesModule,
    NfcGroupsModule,
    NfcsModule,
    NfcDetailsModule,
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
