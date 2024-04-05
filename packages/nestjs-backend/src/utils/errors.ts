import { HttpException, HttpStatus } from '@nestjs/common';

export type TErrorData = string | Record<string, any> | undefined;

export class HttpError extends HttpException {
  constructor(
    data: TErrorData = undefined,
    status = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    const key = typeof data === 'string' ? 'error' : 'errors';

    super({ status, ...(data && { [key]: data }) }, status);
  }
}

export class NotFoundError extends HttpError {
  constructor(data: TErrorData = 'notFound') {
    super(data, HttpStatus.NOT_FOUND);
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(data?: TErrorData) {
    super(data, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
