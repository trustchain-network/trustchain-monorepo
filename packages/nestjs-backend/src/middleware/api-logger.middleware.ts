import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class ApiLoggerMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService<AllConfigType>) {}

  use(request: Request, res: Response, next: NextFunction) {
    const config = this.configService.getOrThrow<string>('app.tracking', {
      infer: true,
    });
    let date = new Date();
    res.on('finish', () => {
      let authorizationKey = '';
      if (typeof request.query.api_key === 'string')
        authorizationKey = request.query.api_key.replace('Bearer ', '');
      else if (typeof request.headers['x-api-key'] === 'string')
        authorizationKey = request.headers['x-api-key'].replace('Bearer ', '');
      else if (request.headers.authorization)
        authorizationKey = request.headers.authorization.replace('Bearer ', '');
      const obj = {
        date,
        method: request.method,
        protocol: request.protocol,
        path: request.path,
        authorization: authorizationKey,
        duration: new Date().getTime() - date.getTime(),
        status: res.statusCode,
      };
      // if (
      //   config.mode === 'all' ||
      //   config.mode === request.user?.type ||
      //   (config.mode === 'api-key-or-user' &&
      //     (request.user?.type === 'api-key' || request.user?.type === 'user'))
      // )
      //this.elasticSearchService.index(config.index, obj);
    });
    next();
  }
}
