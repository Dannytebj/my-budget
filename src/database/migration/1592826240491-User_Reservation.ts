import {MigrationInterface, QueryRunner} from "typeorm";

export class UserReservation1592826240491 implements MigrationInterface {
    name = 'UserReservation1592826240491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservation" ("id" SERIAL NOT NULL, "reservationName" character varying NOT NULL, "reservationDate" character varying NOT NULL, "reservationsLeft" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_parishionertype_enum" AS ENUM('ADMIN', 'REGULAR_PARISHIONER', 'FIRST_TIMER', 'SECOND_TIMER', 'WORKER')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "parishionerType" "user_parishionertype_enum" NOT NULL DEFAULT 'REGULAR_PARISHIONER', "occupation" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "parishionerType"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "parishionerType" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "parishionerType"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "parishionerType" "user_parishionertype_enum" NOT NULL DEFAULT 'REGULAR_PARISHIONER'`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_parishionertype_enum"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
    }

}
