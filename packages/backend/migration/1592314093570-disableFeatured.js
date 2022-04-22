

export class disableFeatured1592314093570 {
    name = 'disableFeatured1592314093570'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ADD "disableFeatured" boolean NOT NULL DEFAULT false`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "disableFeatured"`);
    }

}
