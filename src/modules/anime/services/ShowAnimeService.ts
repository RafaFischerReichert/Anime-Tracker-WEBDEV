import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Anime from "../typeorm/entities/Anime";
import AnimeRepository from "../typeorm/repositories/AnimeRepository";

interface IRequest {
  id: string;
}

export default class ShowAnimeService {
  public async execute({ id }: IRequest): Promise<Anime> {
    const animeRepository = getCustomRepository(AnimeRepository);
    const anime = await animeRepository.findOne(id);
    if (!anime) {
      throw new AppError("Anime series not found.");
    }
    return anime;
  }
}
