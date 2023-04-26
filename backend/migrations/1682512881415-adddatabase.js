import typeorm from "typeorm";
const {MigrationInterface, queryRunner}= typeorm;

export default class Adddatabase1682512881415 {
    name = 'Adddatabase1682512881415'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "comments" (
                "username" character varying NOT NULL,
                "description" character varying NOT NULL,
                "id_film" character varying NOT NULL,
                "mark" integer NOT NULL,
                CONSTRAINT "PK_73a6ce606fccbaf533e0d6a30bf" PRIMARY KEY ("username", "id_film")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "likes" (
                "username" character varying NOT NULL,
                "id_film" character varying NOT NULL,
                "like" boolean NOT NULL,
                CONSTRAINT "PK_4a735b9b28bc6fd6aa56a99e044" PRIMARY KEY ("username", "id_film")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "release_date" TIMESTAMP NOT NULL,
                "description" character varying NOT NULL,
                "genre" character varying NOT NULL,
                "poster_path" character varying NOT NULL,
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title"),
                CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "firstname" character varying NOT NULL,
                "lastname" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_78a916df40e02a9deb1c4b75edb" PRIMARY KEY ("username")
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
        await queryRunner.query(`
            DROP TABLE "likes"
        `);
        await queryRunner.query(`
            DROP TABLE "comments"
        `);
    }
}
