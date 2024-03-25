import { Injectable } from '@nestjs/common';
import { MailService } from 'src/providers/mail/mail.service';
import { TokensService } from 'src/modules/tokens/tokens.service';
import { TwilioService } from 'src/providers/twilio/twilio.service';

@Injectable()
export class MultiFactorAuthenticationService {
  constructor(
    private twilioService: TwilioService,
    private emailService: MailService,
    private tokensService: TokensService,
  ) {}

  // async requestTotpMfa(userId: number): Promise<string> {
  // const enabled = await this.prisma.user.findUnique({
  //   where: { id: userId },
  //   select: { twoFactorMethod: true },
  // });
  // if (!enabled) throw new NotFoundException(USER_NOT_FOUND);
  // if (enabled.twoFactorMethod !== 'NONE')
  //   throw new ConflictException(MFA_ENABLED_CONFLICT);
  // return this.auth.getTotpQrCode(userId);
  // }
}
