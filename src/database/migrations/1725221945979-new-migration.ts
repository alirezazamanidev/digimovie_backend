import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1725221945979 implements MigrationInterface {
    name = 'NewMigration1725221945979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_otp\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`expiresIn\` datetime NOT NULL, \`userId\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_bd81461d078fe46743dd535fb2\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone\` varchar(255) NOT NULL, \`username\` varchar(255) NULL, \`fullname\` varchar(255) NULL, \`email\` varchar(255) NULL, \`phone_verify\` tinyint NOT NULL DEFAULT 0, \`otpId\` int NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8e1f623798118e629b46a9e629\` (\`phone\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`REL_483a6adaf636e520039e97ef61\` (\`otpId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_otp\` ADD CONSTRAINT \`FK_bd81461d078fe46743dd535fb27\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_483a6adaf636e520039e97ef617\` FOREIGN KEY (\`otpId\`) REFERENCES \`user_otp\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_483a6adaf636e520039e97ef617\``);
        await queryRunner.query(`ALTER TABLE \`user_otp\` DROP FOREIGN KEY \`FK_bd81461d078fe46743dd535fb27\``);
        await queryRunner.query(`DROP INDEX \`REL_483a6adaf636e520039e97ef61\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e1f623798118e629b46a9e629\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_bd81461d078fe46743dd535fb2\` ON \`user_otp\``);
        await queryRunner.query(`DROP TABLE \`user_otp\``);
    }

}
