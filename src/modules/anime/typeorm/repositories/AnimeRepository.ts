import { EntityRepository, Repository } from "typeorm";
import Anime from "../entities/Anime";

@EntityRepository(Anime)
export default class AnimeRepository extends Repository<Anime> {
  public async findByTitle(title: string): Promise<Anime | undefined> {
    const anime = this.findOne({ where: { title } });
    return anime;
  }
}
