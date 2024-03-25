import { Injectable } from '@nestjs/common';
import { DnsService } from 'src/providers/dns/dns.service';

@Injectable()
export class DomainsService {
  constructor(private dnsService: DnsService) {}
}
