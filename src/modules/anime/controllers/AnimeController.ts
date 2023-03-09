import { Request, Response } from "express";
import CreateAnimeService from "../services/CreateAnimeService";
import DeleteAnimeService from "../services/DeleteAnimeService";
import ListAnimeService from "../services/ListAnimeService";
import ShowAnimeService from "../services/ShowAnimeService";
import UpdateAnimeService from "../services/UpdateAnimeService";

export default class AnimeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAnime = new ListAnimeService();
    const anime = await listAnime.execute();
    return response.json(anime);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showAnime = new ShowAnimeService();
    const anime = await showAnime.execute({ id });
    return response.json(anime);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, year, genre, started, finished, rating } = request.body;
    const createAnime = new CreateAnimeService();
    const anime = await createAnime.execute({
      title,
      year,
      genre,
      started,
      finished,
      rating,
    });
    return response.json(anime);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, year, genre, started, finished, rating } = request.body;
    const { id } = request.params;
    const updateAnime = new UpdateAnimeService();
    const anime = await updateAnime.execute({
      id,
      title,
      year,
      genre,
      started,
      finished,
      rating,
    });
    return response.json(anime);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteAnime = new DeleteAnimeService();
    await deleteAnime.execute({ id });
    return response.json([]);
  }
}
