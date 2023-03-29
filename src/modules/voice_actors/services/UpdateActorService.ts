import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import VoiceActor from "../typeorm/entities/VoiceActor";
import VoiceActorRepository from "../typeorm/repositories/VoiceActorRepository";

interface IRequest {
  id: string;
  name: string;
  website: string;
}

export default class UpdateActorService {
  public async execute({ id, name, website }: IRequest): Promise<VoiceActor> {
    const actorRepository = getCustomRepository(VoiceActorRepository);
    const actor = await actorRepository.findById(id);
    if (!actor) {
      throw new AppError("Voice Actor not found.");
    }

    const actorExists = await actorRepository.findByWebsite(website);
    if (actorExists && website != actor.website) {
      throw new AppError("There is already an actor with this website.");
    }

    actor.name = name;
    actor.website = website;

    await actorRepository.save(actor);
    return actor;
  }
}
