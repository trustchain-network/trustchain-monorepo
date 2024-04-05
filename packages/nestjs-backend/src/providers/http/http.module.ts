import { HttpModule as AxiosModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpService } from './http.service';

@Module({
  imports: [AxiosModule],
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
