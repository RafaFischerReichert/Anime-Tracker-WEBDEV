import VoiceActor from "@modules/voice_actors/typeorm/entities/VoiceActor";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import AnimeCharacters from "./AnimeCharacters";

@Entity("characters")
export default class Character {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @ManyToOne(() => VoiceActor)
  @JoinColumn({ name: "voice_actor_id" })
  voiceActor: VoiceActor;
  @OneToMany(
    () => AnimeCharacters,
    (anime_characters) => anime_characters.character
  )
  anime_characters: AnimeCharacters[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
