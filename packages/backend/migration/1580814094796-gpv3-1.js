

export class gpv311580814094796 {
    name = 'gpv311580814094796'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "isVerified" boolean NOT NULL DEFAULT false`, undefined);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`, undefined);
    }

}
