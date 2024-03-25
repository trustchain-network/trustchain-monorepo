---
inject: true
to: src/providers/database/seeds/relational/run-seed.ts
before: close
---
  await app.get(<%= name %>SeedService).run();
