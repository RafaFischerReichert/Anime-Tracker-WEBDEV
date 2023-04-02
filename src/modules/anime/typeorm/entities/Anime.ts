import AnimeCharacters from "@modules/characters/typeorm/entities/AnimeCharacters";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("anime")
export default class Anime {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @OneToMany(
    () => AnimeCharacters,
    (anime_characters) => anime_characters.anime
  )
  anime_characters: AnimeCharacters;
  @Column()
  title: string;
  @Column()
  year: string;
  @Column()
  genre: string;
  @Column()
  started: boolean;
  @Column()
  finished: boolean;
  @Column("smallint")
  rating: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
