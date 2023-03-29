import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import VoiceActor from "../typeorm/entities/VoiceActor";
import VoiceActorRepository from "../typeorm/repositories/VoiceActorRepository";

interface IRequest {
  id: string;
}

export default class DeleteActorService {
  public async execute({ id }: IRequest): Promise<VoiceActor> {
    const actorRepository = getCustomRepository(VoiceActorRepository);
    const actor = await actorRepository.findById(id);
    if (!actor) {
      throw new AppError("Voice Actor not found.");
    }

    await actorRepository.remove(actor);
    return actor;
  }
}
