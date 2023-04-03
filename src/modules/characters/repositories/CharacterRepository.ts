import VoiceActor from "@modules/voice_actors/typeorm/entities/VoiceActor";
import { EntityRepository, Repository } from "typeorm";
import Character from "../typeorm/entities/Character";

interface IAnime {
  anime_id: string;
  isMainCharacter: boolean;
}

interface IRequest {
  name: string;
  voiceActor: VoiceActor;
  anime: IAnime[];
}

@EntityRepository(Character)
export default class CharacterRepository extends Repository<Character> {
  public async findById(id: string): Promise<Character | undefined> {
    const character = this.findOne(id, {
      relations: ["anime_characters", "voice_actor"],
    });
    return character;
  }

  public async createCharacter({
    name,
    voiceActor,
    anime,
  }: IRequest): Promise<Character> {
    const character = this.create({ name, voiceActor, anime_characters: anime });
    await this.save(character);
    return character;
  }
}
