import { AppConfig } from './app-config.type';
import { AppleConfig } from '../modules/auth-apple/config/apple-config.type';
import { AuthConfig } from '../modules/auth/config/auth-config.type';
import { DatabaseConfig } from '../providers/database/config/database-config.type';
import { FacebookConfig } from '../modules/auth-facebook/config/facebook-config.type';
import { FileConfig } from '../modules/files/config/file-config.type';
import { GoogleConfig } from '../modules/auth-google/config/google-config.type';
import { MailConfig } from '../providers/mail/config/mail-config.type';
import { TwitterConfig } from '../modules/auth-twitter/config/twitter-config.type';

export type AllConfigType = {
  app: AppConfig;
  apple: AppleConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
  facebook: FacebookConfig;
  file: FileConfig;
  google: GoogleConfig;
  mail: MailConfig;
  twitter: TwitterConfig;
};
