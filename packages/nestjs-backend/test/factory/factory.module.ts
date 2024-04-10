import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/modules/auth/auth.service';
import { FilesService } from 'src/modules/files/files.service';
import { SessionsService } from 'src/modules/sessions/sessions.service';
import { UsersService } from 'src/modules/users/users.service';
import { FileEntity } from 'src/modules/files/infrastructure/persistence/relational/entities/file.entity';
import { SessionEntity } from 'src/modules/sessions/infrastructure/persistence/relational/entities/session.entity';
import { UserEntity } from 'src/modules/users/infrastructure/persistence/relational/entities/user.entity';
import { MailerService } from 'src/providers/mailer/mailer.service';
import { Membership } from 'src/modules/membership/entities/membership.entity';
import { UserFactoryService } from './user.factory.service';
import { MailService } from 'src/providers/mail/mail.service';
import { RelationalUserPersistenceModule } from 'src/modules/users/infrastructure/persistence/relational/relational-persistence.module';
import { RelationalSessionPersistenceModule } from 'src/modules/sessions/infrastructure/persistence/relational/relational-persistence.module';
import { RelationalFilePersistenceModule } from 'src/modules/files/infrastructure/persistence/relational/relational-persistence.module';
import { NfcsFactoryService } from './nfcs.factory.service';
import { NfcEntity } from 'src/modules/nfcs/infrastructure/persistence/relational/entities/nfc.entity';
import { NfcScan } from 'src/modules/nfc-scan/entities/nfc-scan.entity';
import { NfcScanFactoryService } from './nfcs-scan.factory.service';

const factories = [
  UserFactoryService,
  NfcsFactoryService,
  NfcScanFactoryService,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SessionEntity,
      FileEntity,
      Membership,
      NfcEntity,
      NfcScan,
    ]),
    JwtModule.register({}),
    RelationalUserPersistenceModule,
    RelationalSessionPersistenceModule,
    RelationalFilePersistenceModule,
  ],
  providers: [
    AuthService,
    UsersService,
    SessionsService,
    MailService,
    MailerService,
    FilesService,
    ...factories,
  ],
  exports: [...factories],
})
export class FactoryModule {}
