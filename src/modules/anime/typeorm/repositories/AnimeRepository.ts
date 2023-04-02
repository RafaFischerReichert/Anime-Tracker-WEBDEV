import { EntityRepository, In, Repository } from "typeorm";
import Anime from "../entities/Anime";

interface IFindAnime {
  id: string;
}

@EntityRepository(Anime)
export default class AnimeRepository extends Repository<Anime> {
  public async findByTitle(title: string): Promise<Anime | undefined> {
    const anime = this.findOne({ where: { title } });
    return anime;
  }

  public async findAllByIds(anime: IFindAnime[]): Promise<Anime[]> {
    const animeIds = anime.map((series) => series.id);
    const existsAnime = await this.find({
      where: {
        id: In(animeIds),
      },
    });
    return existsAnime;
  }
}
