import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1670719887073 implements MigrationInterface {
    name = 'generated1670719887073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "word" ("text" character varying NOT NULL, "availableSince" date NOT NULL, CONSTRAINT "PK_bf29f74f64b55574fe92457a12a" PRIMARY KEY ("text"))`);
        await queryRunner.query(`CREATE TABLE "guess" ("text" character varying NOT NULL, "similarity" double precision NOT NULL, "rank" integer NOT NULL, CONSTRAINT "PK_7a32906f907833cc8d244d80977" PRIMARY KEY ("text"))`);
        await queryRunner.query(`CREATE TABLE "user_guess" ("userId" integer NOT NULL, "guessText" character varying NOT NULL, CONSTRAINT "PK_a1e9402e9689e397906e94dcda1" PRIMARY KEY ("userId", "guessText"))`);
        await queryRunner.query(`ALTER TABLE "user_guess" ADD CONSTRAINT "FK_d863716998ab277db3616e47c6c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_guess" ADD CONSTRAINT "FK_29d897f242509e52b5dee2b0256" FOREIGN KEY ("guessText") REFERENCES "guess"("text") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_guess" DROP CONSTRAINT "FK_29d897f242509e52b5dee2b0256"`);
        await queryRunner.query(`ALTER TABLE "user_guess" DROP CONSTRAINT "FK_d863716998ab277db3616e47c6c"`);
        await queryRunner.query(`DROP TABLE "user_guess"`);
        await queryRunner.query(`DROP TABLE "guess"`);
        await queryRunner.query(`DROP TABLE "word"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
