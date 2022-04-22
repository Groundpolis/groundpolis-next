

export class PremiumDrive1570091775183 {

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" ADD "premiumDriveCapacityMb" integer NOT NULL DEFAULT 2048`, undefined);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "premiumDriveCapacityMb"`, undefined);
    }

}
