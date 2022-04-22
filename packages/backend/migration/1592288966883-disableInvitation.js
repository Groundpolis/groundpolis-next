

export class disableInvitation1592288966883 {
    name = 'disableInvitation1592288966883'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ADD "disableInvitation" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "meta" ADD "disableInvitationReason" character varying(64) NOT NULL DEFAULT ''`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "disableInvitationReason"`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "disableInvitation"`);
    }

}
