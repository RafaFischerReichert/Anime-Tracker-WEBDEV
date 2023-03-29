import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import VoiceActor from "../typeorm/entities/VoiceActor";
import VoiceActorRepository from "../typeorm/repositories/VoiceActorRepository";

interface IRequest {
  id: string;
}

export default class ShowActorService {
  public async execute({ id }: IRequest): Promise<VoiceActor | undefined> {
    const actorRepository = getCustomRepository(VoiceActorRepository);
    const actor = actorRepository.findById(id);
    if (!actor) {
      throw new AppError("Voice Actor not found.");
    }
    return actor;
  }
}
