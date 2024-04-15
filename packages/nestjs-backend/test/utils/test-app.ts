import { Test, TestingModule } from '@nestjs/testing';

import {
  ClassSerializerInterceptor,
  Type,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import request from 'supertest';
import { FakeMailer } from './fake-mailer';

import { BaseExceptionFilter, HttpAdapterHost, Reflector } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { TestModule } from './test.module';
import validationOptions from 'src/utils/validation-options';
import { MailerService } from 'src/providers/mailer/mailer.service';
import { stripeProvisionToken } from 'src/providers/stripe/stripe.provider';
import { StripeMock } from './stripe.mock';

interface IModuleInit {
  testingModules: Type<unknown>[];
  fakeMailer?: FakeMailer;
  stripeMock?: StripeMock;
}

export class TestApp {
  constructor(
    protected _app: INestApplication,
    protected _module: TestingModule,
  ) {}
  static async init({ testingModules, fakeMailer, stripeMock }: IModuleInit) {
    const moduleBuilder = Test.createTestingModule({
      imports: [TestModule, ...testingModules],
    });

    if (fakeMailer) {
      moduleBuilder.overrideProvider(MailerService).useValue(fakeMailer);
    }

    if (stripeMock) {
      moduleBuilder.overrideProvider(stripeProvisionToken).useValue(stripeMock);
    }

    const moduleFixture = await moduleBuilder.compile();
    const app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe(validationOptions));
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    useContainer(app.select(TestModule), { fallbackOnErrors: true });

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new BaseExceptionFilter(httpAdapter));

    await app.init();

    return new TestApp(app, moduleFixture);
  }

  public get app() {
    return this._app;
  }

  public get module() {
    return this._module;
  }

  public httpClient() {
    return request(this.app.getHttpServer());
  }

  public async closeApp() {
    return this.app.close();
  }
}

export default TestApp;
