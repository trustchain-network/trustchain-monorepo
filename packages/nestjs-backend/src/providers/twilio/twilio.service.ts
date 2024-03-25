import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import PQueue from 'p-queue';
// import pRetry from 'p-retry';
import { Twilio } from 'twilio';
import TwilioClient from 'twilio/lib/rest/Twilio';
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';

@Injectable()
export class TwilioService {
  client: TwilioClient;
  logger = new Logger(TwilioService.name);
  //private queue = new PQueue({ concurrency: 1 });

  constructor(private configService: ConfigService) {
    // const twilioAccountSid = this.configService.getOrThrow<string>(
    //   'sms.twilioAccountSid',
    // );
    // const twilioAuthToken = this.configService.getOrThrow<string>(
    //   'sms.twilioAuthToken',
    // );
    // const twilioMaxRetries =
    //   this.configService.getOrThrow<number>('sms.twilioMaxRetries') || 3;
    // const twilioLogLevel =
    //   this.configService.getOrThrow<string>('sms.twilioLogLevel') || 'debug';
    // if (!twilioAccountSid || !twilioAuthToken)
    //   this.logger.warn('Twilio account SID/auth token not found');
    // this.client = new Twilio(twilioAccountSid, twilioAuthToken, {
    //   autoRetry: true,
    //   maxRetries: twilioMaxRetries,
    //   logLevel: twilioLogLevel,
    // });
  }

  // send(options: MessageListInstanceCreateOptions) {
  //   this.queue
  //     .add(() =>
  //       pRetry(() => this.sendSms(options), {
  //         retries: this.configService.getOrThrow<number>('sms.retries') ?? 3,
  //         onFailedAttempt: (error) => {
  //           this.logger.error(
  //             `SMS to ${options.to} failed, retrying (${error.retriesLeft} attempts left)`,
  //             error.name,
  //           );
  //         },
  //       }),
  //     )
  //     .then(() => {})
  //     .catch(() => {});
  // }

  // private async sendSms(options: MessageListInstanceCreateOptions) {
  //   return this.client.messages.create(options);
  // }
}
