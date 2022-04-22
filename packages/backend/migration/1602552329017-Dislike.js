

export class Dislike1602552329017 {
    name = 'Dislike1602552329017'

    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "note_reaction" ADD "dislike" boolean');
    }

    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "note_reaction" DROP COLUMN "dislike"');
    }

}
