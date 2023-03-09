import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Anime from "../typeorm/entities/Anime";
import AnimeRepository from "../typeorm/repositories/AnimeRepository";

interface IRequest {
  id: string;
  title: string;
  year: string;
  genre: string;
  started: boolean;
  finished: boolean;
  rating: number;
}

export default class UpdateAnimeService {
  public async execute({
    id,
    title,
    year,
    genre,
    started,
    finished,
    rating,
  }: IRequest): Promise<Anime> {
    const animeRepository = getCustomRepository(AnimeRepository);
    const anime = await animeRepository.findOne(id);
    if (!anime) {
      throw new AppError("Anime series not found.");
    }
    const animeExists = await animeRepository.findByTitle(title);
    if (animeExists && title != anime.title) {
      throw new AppError("There is already a series with this title.");
    }
    anime.title = title;
    anime.year = year;
    anime.genre = genre;
    anime.started = started;
    anime.finished = finished;
    anime.rating = rating;

    await animeRepository.save(anime);
    return anime;
  }
}
