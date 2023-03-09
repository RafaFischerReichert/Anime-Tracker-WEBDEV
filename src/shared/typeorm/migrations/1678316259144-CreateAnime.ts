import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnime1678316259144 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "anime",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          { name: "title", type: "varchar" },
          { name: "year", type: "varchar" },
          { name: "genre", type: "varchar" },
          { name: "started", type: "boolean" },
          { name: "finished", type: "boolean" },
          { name: "rating", type: "smallint" },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("anime");
  }
}
