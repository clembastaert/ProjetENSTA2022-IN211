import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class movie1681760857117 {
    name = 'movie1681760857117'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "Title" character varying NOT NULL,
                "ReleaseDate" TIMESTAMP NOT NULL,
                CONSTRAINT "UQ_e6a83c65f5c5581e8d8f2298cb8" UNIQUE ("Title"),
                CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "firstname" character varying NOT NULL,
                "lastname" character varying NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
