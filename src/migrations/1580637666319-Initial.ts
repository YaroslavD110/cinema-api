import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1580637666319 implements MigrationInterface {
  name = 'Initial1580637666319';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "genres" ("id" SERIAL NOT NULL, "label" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, CONSTRAINT "UQ_d1cbe4fe39bdfc77c76e94eada5" UNIQUE ("slug"), CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "images" ("id" uuid NOT NULL, "mimetype" character varying(255) NOT NULL, "extension" character varying(5) NOT NULL, "size" integer NOT NULL, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "directors" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, "eng_name" character varying(255), "birth_place" character varying(255), "birthDate" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "poster_img_id" uuid, CONSTRAINT "UQ_07a387c60be336cb27ef3c46d04" UNIQUE ("slug"), CONSTRAINT "REL_5f01728a73eaff7d6bcae7d3c5" UNIQUE ("poster_img_id"), CONSTRAINT "PK_a9ae28f00c93801aa034a2c1773" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "countries" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, CONSTRAINT "UQ_7b46da5e1b89d03da927ee59e0a" UNIQUE ("slug"), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "films" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, "eng_title" character varying(255), "year" smallint NOT NULL, "views_number" bigint NOT NULL DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" text NOT NULL, "poster_img_id" uuid, CONSTRAINT "UQ_5be832e482e546ce0ae2ead2b31" UNIQUE ("slug"), CONSTRAINT "REL_398227349aa12778c9941d770e" UNIQUE ("poster_img_id"), CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "actors" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "slug" character varying(255) NOT NULL, "eng_name" character varying(255), "birth_place" character varying(255), "birthDate" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "poster_img_id" uuid, CONSTRAINT "UQ_d728e8d8a38480121d06532aabf" UNIQUE ("slug"), CONSTRAINT "REL_24a84facd9d11b9ceb2ec58365" UNIQUE ("poster_img_id"), CONSTRAINT "PK_d8608598c2c4f907a78de2ae461" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "token" uuid NOT NULL, "fingerprint" character varying(255) NOT NULL, "user_agent" character varying(255) NOT NULL, "expires_in" bigint NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "UQ_e9f62f5dcb8a54b84234c9e7a06" UNIQUE ("token"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(255) NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "salt" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_772886e2f1f47b9ceb04a06e203" UNIQUE ("username", "email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "film_screenshots" ("film_id" integer NOT NULL, "image_id" uuid NOT NULL, CONSTRAINT "PK_58eb94b03f8436f3538bfb15a82" PRIMARY KEY ("film_id", "image_id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc91918f76d2be898252670929" ON "film_screenshots" ("film_id") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_50faacae3cf66ffbde4ef9bec3" ON "film_screenshots" ("image_id") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "film_genres" ("film_id" integer NOT NULL, "genre_id" integer NOT NULL, CONSTRAINT "PK_fd12866d0d5a8fdf24844a964ac" PRIMARY KEY ("film_id", "genre_id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9b6ca3be1e09e7537b24144d21" ON "film_genres" ("film_id") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d273e8fd854a03f655a751f393" ON "film_genres" ("genre_id") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "film_directors" ("film_id" integer NOT NULL, "director_id" integer NOT NULL, CONSTRAINT "PK_c4d197b382cf6e39a0e483fb9cd" PRIMARY KEY ("film_id", "director_id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2072bbe75503bb90ba986763c8" ON "film_directors" ("film_id") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31e9df5d9da15311f393e73035" ON "film_directors" ("director_id") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "film_actors" ("film_id" integer NOT NULL, "actor_id" integer NOT NULL, CONSTRAINT "PK_cae6dc7e2a41acb0a85d2f4d8f9" PRIMARY KEY ("film_id", "actor_id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b651fda3176d76fde54ad85708" ON "film_actors" ("film_id") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a84a94a93e5aed338c4815f54a" ON "film_actors" ("actor_id") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "film_countries" ("film_id" integer NOT NULL, "country_id" integer NOT NULL, CONSTRAINT "PK_73289f23bf5aa9d9fba1702e01c" PRIMARY KEY ("film_id", "country_id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06548b250996a2e8710eabb132" ON "film_countries" ("film_id") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f34524cd2c2559775ac4df8a39" ON "film_countries" ("country_id") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "actor_genres" ("actor_id" integer NOT NULL, "genre_id" integer NOT NULL, CONSTRAINT "PK_db41b1e59099bf800bf48d97370" PRIMARY KEY ("actor_id", "genre_id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4c024244ebd7cdd065d8cc8a15" ON "actor_genres" ("actor_id") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d4f4af38f9ccf0c53c83573c18" ON "actor_genres" ("genre_id") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "user_permissions" ("user_id" integer NOT NULL, "permission_id" uuid NOT NULL, CONSTRAINT "PK_a537c48b1f80e8626a71cb56589" PRIMARY KEY ("user_id", "permission_id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3495bd31f1862d02931e8e8d2e" ON "user_permissions" ("user_id") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8145f5fadacd311693c15e41f1" ON "user_permissions" ("permission_id") `,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "directors" ADD CONSTRAINT "FK_5f01728a73eaff7d6bcae7d3c55" FOREIGN KEY ("poster_img_id") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "films" ADD CONSTRAINT "FK_398227349aa12778c9941d770e6" FOREIGN KEY ("poster_img_id") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "actors" ADD CONSTRAINT "FK_24a84facd9d11b9ceb2ec583655" FOREIGN KEY ("poster_img_id") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_screenshots" ADD CONSTRAINT "FK_dc91918f76d2be898252670929f" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_screenshots" ADD CONSTRAINT "FK_50faacae3cf66ffbde4ef9bec39" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_genres" ADD CONSTRAINT "FK_9b6ca3be1e09e7537b24144d21d" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_genres" ADD CONSTRAINT "FK_d273e8fd854a03f655a751f393e" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_directors" ADD CONSTRAINT "FK_2072bbe75503bb90ba986763c8f" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_directors" ADD CONSTRAINT "FK_31e9df5d9da15311f393e730354" FOREIGN KEY ("director_id") REFERENCES "directors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_actors" ADD CONSTRAINT "FK_b651fda3176d76fde54ad85708b" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_actors" ADD CONSTRAINT "FK_a84a94a93e5aed338c4815f54a8" FOREIGN KEY ("actor_id") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_countries" ADD CONSTRAINT "FK_06548b250996a2e8710eabb1326" FOREIGN KEY ("film_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_countries" ADD CONSTRAINT "FK_f34524cd2c2559775ac4df8a39f" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "actor_genres" ADD CONSTRAINT "FK_4c024244ebd7cdd065d8cc8a157" FOREIGN KEY ("actor_id") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "actor_genres" ADD CONSTRAINT "FK_d4f4af38f9ccf0c53c83573c18e" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_permissions" ADD CONSTRAINT "FK_3495bd31f1862d02931e8e8d2e8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_permissions" ADD CONSTRAINT "FK_8145f5fadacd311693c15e41f10" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user_permissions" DROP CONSTRAINT "FK_8145f5fadacd311693c15e41f10"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_permissions" DROP CONSTRAINT "FK_3495bd31f1862d02931e8e8d2e8"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "actor_genres" DROP CONSTRAINT "FK_d4f4af38f9ccf0c53c83573c18e"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "actor_genres" DROP CONSTRAINT "FK_4c024244ebd7cdd065d8cc8a157"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_countries" DROP CONSTRAINT "FK_f34524cd2c2559775ac4df8a39f"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_countries" DROP CONSTRAINT "FK_06548b250996a2e8710eabb1326"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_actors" DROP CONSTRAINT "FK_a84a94a93e5aed338c4815f54a8"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_actors" DROP CONSTRAINT "FK_b651fda3176d76fde54ad85708b"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_directors" DROP CONSTRAINT "FK_31e9df5d9da15311f393e730354"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_directors" DROP CONSTRAINT "FK_2072bbe75503bb90ba986763c8f"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_genres" DROP CONSTRAINT "FK_d273e8fd854a03f655a751f393e"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_genres" DROP CONSTRAINT "FK_9b6ca3be1e09e7537b24144d21d"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_screenshots" DROP CONSTRAINT "FK_50faacae3cf66ffbde4ef9bec39"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "film_screenshots" DROP CONSTRAINT "FK_dc91918f76d2be898252670929f"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "actors" DROP CONSTRAINT "FK_24a84facd9d11b9ceb2ec583655"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "films" DROP CONSTRAINT "FK_398227349aa12778c9941d770e6"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "directors" DROP CONSTRAINT "FK_5f01728a73eaff7d6bcae7d3c55"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_8145f5fadacd311693c15e41f1"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_3495bd31f1862d02931e8e8d2e"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "user_permissions"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_d4f4af38f9ccf0c53c83573c18"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_4c024244ebd7cdd065d8cc8a15"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "actor_genres"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_f34524cd2c2559775ac4df8a39"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_06548b250996a2e8710eabb132"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "film_countries"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_a84a94a93e5aed338c4815f54a"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_b651fda3176d76fde54ad85708"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "film_actors"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_31e9df5d9da15311f393e73035"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_2072bbe75503bb90ba986763c8"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "film_directors"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_d273e8fd854a03f655a751f393"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_9b6ca3be1e09e7537b24144d21"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "film_genres"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_50faacae3cf66ffbde4ef9bec3"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_dc91918f76d2be898252670929"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "film_screenshots"`, undefined);
    await queryRunner.query(`DROP TABLE "permissions"`, undefined);
    await queryRunner.query(`DROP TABLE "users"`, undefined);
    await queryRunner.query(`DROP TABLE "sessions"`, undefined);
    await queryRunner.query(`DROP TABLE "actors"`, undefined);
    await queryRunner.query(`DROP TABLE "films"`, undefined);
    await queryRunner.query(`DROP TABLE "countries"`, undefined);
    await queryRunner.query(`DROP TABLE "directors"`, undefined);
    await queryRunner.query(`DROP TABLE "images"`, undefined);
    await queryRunner.query(`DROP TABLE "genres"`, undefined);
  }
}
