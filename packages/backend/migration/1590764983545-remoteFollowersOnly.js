

export class remoteFollowersOnly1590764983545 {
    name = 'remoteFollowersOnly1590764983545'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "note" ADD "remoteFollowersOnly" boolean NOT NULL DEFAULT false`, undefined);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "note" DROP COLUMN "remoteFollowersOnly"`, undefined);
    }

}
