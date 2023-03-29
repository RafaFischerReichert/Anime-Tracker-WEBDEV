import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import VoiceActor from "../typeorm/entities/VoiceActor";
import VoiceActorRepository from "../typeorm/repositories/VoiceActorRepository";

interface IRequest {
  name: string;
  website: string;
}

export default class CreateActorService {
  public async execute({ name, website }: IRequest): Promise<VoiceActor> {
    const actorRepository = getCustomRepository(VoiceActorRepository);
    const websiteExists = await actorRepository.findByWebsite(website);
    if (websiteExists) {
      throw new AppError("Website already registered.");
    }
    const actor = actorRepository.create({ name, website });
    await actorRepository.save(actor);
    return actor;
  }
}
