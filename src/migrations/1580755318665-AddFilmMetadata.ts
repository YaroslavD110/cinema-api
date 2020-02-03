import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFilmMetadata1580755318665 implements MigrationInterface {
    name = 'AddFilmMetadata1580755318665'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "films" ADD "iframe_url" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "films" ADD "release_date" date`, undefined);
        await queryRunner.query(`ALTER TABLE "films" ADD "runtime" smallint`, undefined);
        await queryRunner.query(`ALTER TABLE "films" ADD "imdb_id" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "films" ADD "IMDBRating" numeric`, undefined);
        await queryRunner.query(`ALTER TABLE "films" ADD "production" character varying(255)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "production"`, undefined);
        await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "IMDBRating"`, undefined);
        await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "imdb_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "runtime"`, undefined);
        await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "release_date"`, undefined);
        await queryRunner.query(`ALTER TABLE "films" DROP COLUMN "iframe_url"`, undefined);
    }

}
