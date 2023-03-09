import Anime from "../typeorm/entities/Anime";
import { getCustomRepository } from "typeorm";
import AnimeRepository from "../typeorm/repositories/AnimeRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  title: string;
  year: string;
  genre: string;
  started: boolean;
  finished: boolean;
  rating: number;
}

export default class CreateAnimeService {
  public async execute({
    title,
    year,
    genre,
    started,
    finished,
    rating,
  }: IRequest): Promise<Anime> {
    const animeRepository = getCustomRepository(AnimeRepository);

    const animeExists = await animeRepository.findByTitle(title);
    if (animeExists) {
      throw new AppError("There is already an anime series with this title.");
    }

    const anime = animeRepository.create({
      title,
      year,
      genre,
      started,
      finished,
      rating,
    });
    await animeRepository.save(anime);
    return anime;
  }
}
