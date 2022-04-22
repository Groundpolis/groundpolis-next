

export class suggestionLimitationSettings1616819210942 {
    name = 'suggestionLimitationSettings1616819210942'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ADD "emojiSuggestionLimitation" integer NOT NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE "meta" ADD "emojiSuggestionLimitationPremium" integer NOT NULL DEFAULT '-1'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "emojiSuggestionLimitationPremium"`);
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "emojiSuggestionLimitation"`);
    }

}
