import { MigrationInterface, QueryRunner } from "typeorm";

export class Task1684533656690 implements MigrationInterface {
    name = 'Task1684533656690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL, "responsable" character varying NOT NULL, "project_id" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
