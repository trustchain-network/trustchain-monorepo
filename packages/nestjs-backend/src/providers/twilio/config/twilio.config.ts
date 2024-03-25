import { registerAs } from '@nestjs/config';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import validateConfig from '../../../utils/validate-config';
import { TwilioConfig } from './twilio-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  TWILIO_ACCOUNT_SID: string;

  @IsString()
  @IsOptional()
  TWILIO_AUTH_TOKEN: string;

  @IsNumber()
  @IsOptional()
  TWILIO_MAX_RETRY: number;

  @IsString()
  @IsOptional()
  TWILIO_LOG_LEVEL: string;

  @IsNumber()
  @IsOptional()
  TWILIO_SMS_RETRY: number;
}

export default registerAs<TwilioConfig>('twilio', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    maxRetry: Number(process.env.TWILIO_MAX_RETRY),
    logLevel: process.env.TWILIO_LOG_LEVEL,
    smsRetry: Number(process.env.TWILIO_SMS_RETRY),
  };
});
