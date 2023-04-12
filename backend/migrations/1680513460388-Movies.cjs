import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

module.exports = class Movies1680513460388 {
    name = 'Movies1680513460388'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movies" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "Titre" character varying NOT NULL,
                "Date" TIMESTAMP NOT NULL,
                CONSTRAINT "UQ_b6a16b0fdc4ad2a3a89ee2c3ef0" UNIQUE ("Titre"),
                CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movies"
        `);
    }
}
