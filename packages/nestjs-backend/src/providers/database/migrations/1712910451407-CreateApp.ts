import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateApp1712910451407 implements MigrationInterface {
  name = 'CreateApp1712910451407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "membership" ("id" SERIAL NOT NULL, "customerId" character varying, "status" character varying, "subscriptionId" character varying, "productId" character varying, "priceId" character varying, "currentPeriodStart" TIMESTAMP, "currentPeriodEnd" TIMESTAMP, "userId" uuid NOT NULL, "tier" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "REL_eef2d9d9c70cd13bed868afedf" UNIQUE ("userId"), CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "lastName" character varying, "countryCode" character varying, "twoFactor" character varying, "twoFactorPhone" character varying, "twoFactorSecret" character varying, "roleId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "statusId" integer, "createdById" uuid, "updatedById" uuid, "deletedById" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."nfcDetail_ictype_enum" AS ENUM('NTAG')`,
    );
    await queryRunner.query(
      `CREATE TABLE "nfcDetail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "icManifacturer" character varying, "icType" "public"."nfcDetail_ictype_enum" DEFAULT 'NTAG', "memoryInfo" character varying, "technologies" jsonb NOT NULL, "majorVersion" character varying, "minorVersion" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdById" uuid, "updatedById" uuid, "deletedById" uuid, CONSTRAINT "PK_7bf84ef76fb5b3308b6f07d8bcd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."nfc_status_enum" AS ENUM('active', 'inactive', 'deleted')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."nfc_tagstatus_enum" AS ENUM('blank', 'encoded_unlock', 'encoded_lock')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."nfc_encryptionmode_enum" AS ENUM('AES', 'LRP')`,
    );
    await queryRunner.query(
      `CREATE TABLE "nfc" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "uid" character varying NOT NULL, "piccData" character varying NOT NULL, "fileData" character varying, "counter" integer NOT NULL, "status" "public"."nfc_status_enum" NOT NULL DEFAULT 'active', "tagStatus" "public"."nfc_tagstatus_enum" NOT NULL DEFAULT 'blank', "encryptionMode" "public"."nfc_encryptionmode_enum" NOT NULL DEFAULT 'AES', "encryptedShareKey" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "detailId" uuid, "createdById" uuid, "updatedById" uuid, "deletedById" uuid, CONSTRAINT "PK_42e5e8f523339faa405808e63a1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "nfcScan" ("id" SERIAL NOT NULL, "nfcId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89b17ae844ea2514ba8c84af4fa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "key" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying NOT NULL, "publicKey" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, CONSTRAINT "PK_5bd67cf28791e02bf07b0367ace" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "two_factor" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d9e707ebc943c110fcaab7cdd8c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, "createdById" uuid, "updatedById" uuid, "deletedById" uuid, CONSTRAINT "UQ_cf461f5b40cf1a2b8876011e1e1" UNIQUE ("name"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "plan" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "price" double precision NOT NULL, "currency" character varying NOT NULL, "duration" integer, "durationType" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedById" uuid, "createdById" uuid, CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "nfcCategory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, CONSTRAINT "PK_e3d8fa77176be4c9dcb09a5f0d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0b8ef9583319363b07c51a9006" ON "nfcCategory" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "mfa" ("id" SERIAL NOT NULL, "token" character varying, "phone" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, CONSTRAINT "UQ_3c926cd5d64fc7778a767f9a2d7" UNIQUE ("token"), CONSTRAINT "UQ_3b3c753944019b73eb6e9ea0b7e" UNIQUE ("phone"), CONSTRAINT "PK_f4e180ccc1f351057978f46d458" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "apiKey" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "description" character varying, "scopes" text, "ipAllowlist" text, "ipRestrictions" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "updatedBy" character varying, "createdBy" character varying, "deletedBy" character varying, CONSTRAINT "PK_2ae3a5e8e04fb402b2dc8d6ce4b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "membership" ADD CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_45c0d39d1f9ceeb56942db93cc5" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_db5173f7d27aa8a98a9fe6113df" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c3062c4102a912dfe7195a72bfb" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfcDetail" ADD CONSTRAINT "FK_5b00ad4f4af59beba7007cc9c37" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfcDetail" ADD CONSTRAINT "FK_cd77f5ec4b307314a2c048acbc4" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfcDetail" ADD CONSTRAINT "FK_71781fd56d77ab543a69a72b78b" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfc" ADD CONSTRAINT "FK_5e5be3957301bc1bc91d2b88617" FOREIGN KEY ("detailId") REFERENCES "nfcDetail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfc" ADD CONSTRAINT "FK_f00e4bca6e854074855b2f6ea45" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfc" ADD CONSTRAINT "FK_3d237df8b30ecd7b767d8dac921" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfc" ADD CONSTRAINT "FK_8eccba968d06f75fab47a0ff667" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfcScan" ADD CONSTRAINT "FK_641688902c0d8caede9ffd5faf8" FOREIGN KEY ("nfcId") REFERENCES "nfc"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_55a938fda82579fd3ec29b3c28e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_3a93fbdeba4e1e9e47fec6bada9" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_3152d46f0ce8751aca92399783d" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" ADD CONSTRAINT "FK_a740aada0e5c9ed5b6344897706" FOREIGN KEY ("deletedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan" ADD CONSTRAINT "FK_24492da525e9ce18f17b33ccd2d" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan" ADD CONSTRAINT "FK_cbe8761b5233cde633f403d97b8" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan" DROP CONSTRAINT "FK_cbe8761b5233cde633f403d97b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "plan" DROP CONSTRAINT "FK_24492da525e9ce18f17b33ccd2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_a740aada0e5c9ed5b6344897706"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_3152d46f0ce8751aca92399783d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_3a93fbdeba4e1e9e47fec6bada9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "team" DROP CONSTRAINT "FK_55a938fda82579fd3ec29b3c28e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfcScan" DROP CONSTRAINT "FK_641688902c0d8caede9ffd5faf8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfc" DROP CONSTRAINT "FK_8eccba968d06f75fab47a0ff667"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfc" DROP CONSTRAINT "FK_3d237df8b30ecd7b767d8dac921"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfc" DROP CONSTRAINT "FK_f00e4bca6e854074855b2f6ea45"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfc" DROP CONSTRAINT "FK_5e5be3957301bc1bc91d2b88617"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfcDetail" DROP CONSTRAINT "FK_71781fd56d77ab543a69a72b78b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfcDetail" DROP CONSTRAINT "FK_cd77f5ec4b307314a2c048acbc4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nfcDetail" DROP CONSTRAINT "FK_5b00ad4f4af59beba7007cc9c37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c3062c4102a912dfe7195a72bfb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_db5173f7d27aa8a98a9fe6113df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_45c0d39d1f9ceeb56942db93cc5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "membership" DROP CONSTRAINT "FK_eef2d9d9c70cd13bed868afedf4"`,
    );
    await queryRunner.query(`DROP TABLE "apiKey"`);
    await queryRunner.query(`DROP TABLE "mfa"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0b8ef9583319363b07c51a9006"`,
    );
    await queryRunner.query(`DROP TABLE "nfcCategory"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "plan"`);
    await queryRunner.query(`DROP TABLE "team"`);
    await queryRunner.query(`DROP TABLE "two_factor"`);
    await queryRunner.query(`DROP TABLE "key"`);
    await queryRunner.query(`DROP TABLE "nfcScan"`);
    await queryRunner.query(`DROP TABLE "nfc"`);
    await queryRunner.query(`DROP TYPE "public"."nfc_encryptionmode_enum"`);
    await queryRunner.query(`DROP TYPE "public"."nfc_tagstatus_enum"`);
    await queryRunner.query(`DROP TYPE "public"."nfc_status_enum"`);
    await queryRunner.query(`DROP TABLE "nfcDetail"`);
    await queryRunner.query(`DROP TYPE "public"."nfcDetail_ictype_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "membership"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "file"`);
  }
}
