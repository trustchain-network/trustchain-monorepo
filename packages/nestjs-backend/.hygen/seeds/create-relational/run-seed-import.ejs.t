---
inject: true
to: src/providers/database/seeds/relational/run-seed.ts
after: \@nestjs\/core
---
import { <%= name %>SeedService } from './<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>-seed.service';