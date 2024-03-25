import { Module } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { DomainsController } from './domains.controller';
import { DnsModule } from 'src/providers/dns/dns.module';

@Module({
  imports: [DnsModule],
  providers: [DomainsService],
  controllers: [DomainsController],
})
export class DomainsModule {}
