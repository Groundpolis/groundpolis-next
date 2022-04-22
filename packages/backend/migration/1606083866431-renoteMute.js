

export class renoteMute1606083866431 {
    name = 'renoteMute1606083866431'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "muting" ADD "isRenoteOnly" boolean NOT NULL DEFAULT FALSE`);
        await queryRunner.query(`COMMENT ON COLUMN "muting"."isRenoteOnly" IS 'Mute only reposts'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`COMMENT ON COLUMN "muting"."isRenoteOnly" IS 'Mute only reposts'`);
        await queryRunner.query(`ALTER TABLE "muting" DROP COLUMN "isRenoteOnly"`);
    }

}
