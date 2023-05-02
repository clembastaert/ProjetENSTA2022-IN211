import typeorm from "typeorm";
const {MigrationInterface, queryRunner}= typeorm;

export default class GenreIds1682528199010 {
    name = 'GenreIds1682528199010'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
            ALTER COLUMN "vote_average" TYPE numeric(5, 3)
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ALTER COLUMN "vote_average" TYPE numeric(4, 3)
        `);
    }
}
