import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import AnimeRepository from "../typeorm/repositories/AnimeRepository";

interface IRequest {
  id: string;
}

export default class DeleteAnimeService {
  public async execute({ id }: IRequest): Promise<void> {
    const animeRepository = getCustomRepository(AnimeRepository);
    const anime = await animeRepository.findOne(id);
    if (!anime) {
      throw new AppError("Series not found.");
    }
    await animeRepository.remove(anime);
  }
}
