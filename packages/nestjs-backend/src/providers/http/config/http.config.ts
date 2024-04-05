import { registerAs } from '@nestjs/config';
import { IsInt, IsOptional } from 'class-validator';
import validateConfig from '../../../utils/validate-config';
import { THttpConfig } from './http-config.type';

class EnvironmentVariablesValidator {
  @IsInt()
  @IsOptional()
  HTTP_TIMEOUT?: number;

  @IsInt()
  @IsOptional()
  HTTP_MAX_REDIRECTS?: number;
}

export default registerAs<THttpConfig>('http', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    timeout: process.env.HTTP_TIMEOUT
      ? parseInt(process.env.HTTP_TIMEOUT, 10)
      : 5000,
    maxRedirects: process.env.HTTP_MAX_REDIRECTS
      ? parseInt(process.env.HTTP_MAX_REDIRECTS, 10)
      : 5,
  };
});
