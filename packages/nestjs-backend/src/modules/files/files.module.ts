import { Module } from '@nestjs/common';
import { RelationalFilePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesService } from './files.service';
import { FilesLocalModule } from './infrastructure/uploader/local/files.module';

@Module({
  imports: [RelationalFilePersistenceModule, FilesLocalModule],
  providers: [FilesService],
  exports: [FilesService, RelationalFilePersistenceModule],
})
export class FilesModule {}
