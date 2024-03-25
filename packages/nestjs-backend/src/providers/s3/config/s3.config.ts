import { registerAs } from '@nestjs/config';
import { S3Config } from './s3-config.type';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from '../../../utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  S3_API_VERSION: string;

  @IsString()
  @IsOptional()
  S3_ACCESS_KEY_ID: string;

  @IsString()
  @IsOptional()
  S3_SECRET_ACCESS_KEY: string;

  @IsString()
  @IsOptional()
  S3_REGION: string;
}

export default registerAs<S3Config>('s3', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    apiVersion: process.env.S3_API_VERSION,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
  };
});
