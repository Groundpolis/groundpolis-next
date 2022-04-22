

export class Sex1567272052176 {
	async up(queryRunner) {
			await queryRunner.query(`CREATE TYPE "user_sex_enum" AS ENUM('not-known', 'male', 'female', 'not-applicable')`);
			await queryRunner.query(`ALTER TABLE "user" ADD "sex" "user_sex_enum" NOT NULL DEFAULT 'not-known'`);
	}

	async down(queryRunner) {
			await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sex"`);
			await queryRunner.query(`DROP TYPE "user_sex_enum"`);
	}
}
