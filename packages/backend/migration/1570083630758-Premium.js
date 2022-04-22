

export class Premium1570083630758 {

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "isPremium" boolean NOT NULL DEFAULT false`, undefined);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isPremium"`, undefined);
    }

}
