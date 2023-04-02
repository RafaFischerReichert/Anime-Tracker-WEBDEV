import Anime from "@modules/anime/typeorm/entities/Anime";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Character from "./Character";

@Entity("anime_characters")
export default class AnimeCharacters {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @ManyToOne(() => Anime, (anime) => anime.anime_characters)
  @JoinColumn({ name: "anime_id" })
  anime: Anime;
  @ManyToOne(() => Character, (character) => character.anime_characters)
  @JoinColumn({ name: "character_id" })
  character: Character;
  @Column()
  anime_id: string;
  @Column()
  character_id: string;
  @Column()
  isMainCharacter: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
