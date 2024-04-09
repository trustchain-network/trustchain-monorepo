import { Injectable, Logger } from '@nestjs/common';
import fs from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class MailerService {
  private logger = new Logger(MailerService.name);

  private readonly transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService<AllConfigType>) {
    const host = configService.getOrThrow('mail.host', { infer: true });
    const port = configService.getOrThrow('mail.port', { infer: true });
    const user = configService.getOrThrow('mail.user', { infer: true });
    const pass = configService.getOrThrow('mail.password', {
      infer: true,
    });

    if (host && port && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        ignoreTLS: configService.get('mail.ignoreTLS', { infer: true }),
        secure: configService.get('mail.secure', { infer: true }),
        requireTLS: configService.get('mail.requireTLS', { infer: true }),
        auth: { user, pass },
      });
    } else {
      this.logger.error('MailerService config is not set');
    }
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: nodemailer.SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = Handlebars.compile(template, {
        strict: true,
      })(context);
    }

    await this.transporter.sendMail({
      ...mailOptions,
      from: mailOptions.from
        ? mailOptions.from
        : `"${this.configService.get('mail.defaultName', {
            infer: true,
          })}" <${this.configService.get('mail.defaultEmail', {
            infer: true,
          })}>`,
      html: mailOptions.html ? mailOptions.html : html,
    });
  }
}
