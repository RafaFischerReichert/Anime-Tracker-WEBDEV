import { getCustomRepository } from "typeorm";
import VoiceActor from "../typeorm/entities/VoiceActor";
import VoiceActorRepository from "../typeorm/repositories/VoiceActorRepository";

export default class ListActorsService {
  public async execute(): Promise<VoiceActor[]> {
    const actorRepository = getCustomRepository(VoiceActorRepository);
    const actors = await actorRepository.find();
    return actors;
  }
}
