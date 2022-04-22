

export class hideFF1590805350225 {
    name = 'hideFF1590805350225'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "hideFF" boolean NOT NULL DEFAULT false`, undefined);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hideFF"`, undefined);
    }

}
