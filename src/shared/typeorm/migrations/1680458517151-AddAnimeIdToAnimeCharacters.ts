import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddAnimeIdToAnimeCharacters1680458517151
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "anime_characters",
      new TableColumn({
        name: "anime_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "anime_characters",
      new TableForeignKey({
        name: "AnimeCharactersAnime",
        columnNames: ["anime_id"],
        referencedTableName: "anime",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "anime_characters",
      "AnimeCharactersAnime"
    );
    await queryRunner.dropColumn("anime_characters", "anime_id");
  }
}
