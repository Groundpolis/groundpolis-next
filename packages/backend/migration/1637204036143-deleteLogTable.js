

export class deleteLogTable1637204036143 {

    async up(queryRunner) {
			await queryRunner.query(`DROP TABLE log`);
    }

    async down(queryRunner) {
    }

}
