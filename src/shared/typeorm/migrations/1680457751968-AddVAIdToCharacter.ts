import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddVAIdToCharacter1680457751968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "characters",
      new TableColumn({
        name: "voice_actor_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "characters",
      new TableForeignKey({
        name: "ActorCharacter",
        columnNames: ["voice_actor_id"],
        referencedTableName: "voice_actors",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("characters", "ActorCharacter");
    await queryRunner.dropColumn("characters", "voice_actor_id");
  }
}
