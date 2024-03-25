import { Module } from '@nestjs/common';
import { MultiFactorAuthenticationService } from './multi-factor-authentication.service';
import { TwilioModule } from 'src/providers/twilio/twilio.module';
import { MailModule } from 'src/providers/mail/mail.module';
import { TokensModule } from 'src/modules/tokens/tokens.module';

@Module({
  imports: [MailModule, TokensModule, TwilioModule],
  providers: [MultiFactorAuthenticationService],
})
export class MultiFactorAuthenticationModule {}
