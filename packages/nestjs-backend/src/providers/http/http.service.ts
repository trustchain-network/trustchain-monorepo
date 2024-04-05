import { HttpService as Axios } from '@nestjs/axios';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpError } from 'src/utils/errors';

@Injectable()
export class HttpService {
  private logger = new Logger(HttpService.name);

  constructor(private readonly axios: Axios) {}

  async get<T>(url: string, params: Record<string, any>): Promise<T> {
    const { data } = await firstValueFrom(
      this.axios.get<T>(url, { params }).pipe(
        catchError(({ response }: AxiosError) => {
          this.logger.error({
            url,
            params,
            status: response?.status,
            response: response?.data,
          });

          throw new HttpError(
            response?.data || 'badRequest',
            response?.status || HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    );

    return data;
  }
}
