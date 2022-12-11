import { MigrationInterface, QueryRunner } from "typeorm";

export class generated1670720623877 implements MigrationInterface {
    name = 'generated1670720623877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_guess" DROP CONSTRAINT "FK_29d897f242509e52b5dee2b0256"`);
        await queryRunner.query(`ALTER TABLE "user_guess" RENAME COLUMN "guessText" TO "guessId"`);
        await queryRunner.query(`ALTER TABLE "user_guess" RENAME CONSTRAINT "PK_a1e9402e9689e397906e94dcda1" TO "PK_ac26886ab89fa3182926d3c35b3"`);
        await queryRunner.query(`ALTER TABLE "guess" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "guess" DROP CONSTRAINT "PK_7a32906f907833cc8d244d80977"`);
        await queryRunner.query(`ALTER TABLE "guess" ADD CONSTRAINT "PK_41da1c4f4aa0e4b5b489a21763a" PRIMARY KEY ("text", "id")`);
        await queryRunner.query(`ALTER TABLE "user_guess" DROP CONSTRAINT "PK_ac26886ab89fa3182926d3c35b3"`);
        await queryRunner.query(`ALTER TABLE "user_guess" ADD CONSTRAINT "PK_d863716998ab277db3616e47c6c" PRIMARY KEY ("userId")`);
        await queryRunner.query(`ALTER TABLE "user_guess" DROP COLUMN "guessId"`);
        await queryRunner.query(`ALTER TABLE "user_guess" ADD "guessId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_guess" DROP CONSTRAINT "PK_d863716998ab277db3616e47c6c"`);
        await queryRunner.query(`ALTER TABLE "user_guess" ADD CONSTRAINT "PK_ac26886ab89fa3182926d3c35b3" PRIMARY KEY ("userId", "guessId")`);
        await queryRunner.query(`ALTER TABLE "guess" DROP CONSTRAINT "PK_41da1c4f4aa0e4b5b489a21763a"`);
        await queryRunner.query(`ALTER TABLE "guess" ADD CONSTRAINT "PK_3a695f50b71c117a9fb5b8ff67c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "guess" ADD CONSTRAINT "UQ_7a32906f907833cc8d244d80977" UNIQUE ("text")`);
        await queryRunner.query(`ALTER TABLE "user_guess" ADD CONSTRAINT "FK_c63e2fdd8984276ddb37f2a21d7" FOREIGN KEY ("guessId") REFERENCES "guess"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_guess" DROP CONSTRAINT "FK_c63e2fdd8984276ddb37f2a21d7"`);
        await queryRunner.query(`ALTER TABLE "guess" DROP CONSTRAINT "UQ_7a32906f907833cc8d244d80977"`);
        await queryRunner.query(`ALTER TABLE "guess" DROP CONSTRAINT "PK_3a695f50b71c117a9fb5b8ff67c"`);
        await queryRunner.query(`ALTER TABLE "guess" ADD CONSTRAINT "PK_41da1c4f4aa0e4b5b489a21763a" PRIMARY KEY ("text", "id")`);
        await queryRunner.query(`ALTER TABLE "user_guess" DROP CONSTRAINT "PK_ac26886ab89fa3182926d3c35b3"`);
        await queryRunner.query(`ALTER TABLE "user_guess" ADD CONSTRAINT "PK_d863716998ab277db3616e47c6c" PRIMARY KEY ("userId")`);
        await queryRunner.query(`ALTER TABLE "user_guess" DROP COLUMN "guessId"`);
        await queryRunner.query(`ALTER TABLE "user_guess" ADD "guessId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_guess" DROP CONSTRAINT "PK_d863716998ab277db3616e47c6c"`);
        await queryRunner.query(`ALTER TABLE "user_guess" ADD CONSTRAINT "PK_ac26886ab89fa3182926d3c35b3" PRIMARY KEY ("userId", "guessId")`);
        await queryRunner.query(`ALTER TABLE "guess" DROP CONSTRAINT "PK_41da1c4f4aa0e4b5b489a21763a"`);
        await queryRunner.query(`ALTER TABLE "guess" ADD CONSTRAINT "PK_7a32906f907833cc8d244d80977" PRIMARY KEY ("text")`);
        await queryRunner.query(`ALTER TABLE "guess" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user_guess" RENAME CONSTRAINT "PK_ac26886ab89fa3182926d3c35b3" TO "PK_a1e9402e9689e397906e94dcda1"`);
        await queryRunner.query(`ALTER TABLE "user_guess" RENAME COLUMN "guessId" TO "guessText"`);
        await queryRunner.query(`ALTER TABLE "user_guess" ADD CONSTRAINT "FK_29d897f242509e52b5dee2b0256" FOREIGN KEY ("guessText") REFERENCES "guess"("text") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
