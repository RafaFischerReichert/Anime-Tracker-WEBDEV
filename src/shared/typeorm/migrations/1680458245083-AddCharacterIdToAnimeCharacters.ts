import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddCharacterIdToAnimeCharacters1680458245083
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "anime_characters",
      new TableColumn({
        name: "character_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "anime_characters",
      new TableForeignKey({
        name: "AnimeCharactersCharacters",
        columnNames: ["character_id"],
        referencedTableName: "characters",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "anime_characters",
      "AnimeCharactersCharacters"
    );
    await queryRunner.dropColumn("anime_characters", "character_id");
  }
}
