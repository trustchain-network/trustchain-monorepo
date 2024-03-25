import { registerAs } from '@nestjs/config';
import { StripeConfig } from './stripe-config.type';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from '../../../utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  STRIPE_SECRET_KEY: string;

  @IsString()
  @IsOptional()
  STRIPE_CURRENCY: string;
}

export default registerAs<StripeConfig>('stripe', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    secretKey: process.env.STRIPE_SECRET_KEY,
    currency: process.env.STRIPE_CURRENCY,
  };
});
