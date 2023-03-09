import { getCustomRepository } from "typeorm";
import Anime from "../typeorm/entities/Anime";
import AnimeRepository from "../typeorm/repositories/AnimeRepository";

export default class ListAnimeService {
  public async execute(): Promise<Anime[]> {
    const animeRepository = getCustomRepository(AnimeRepository);
    const anime = animeRepository.find();
    return anime;
  }
}
