import { getCustomRepository } from "typeorm";
import Character from "../typeorm/entities/Character";
import CharacterRepository from "../repositories/CharacterRepository";
import AnimeRepository from "@modules/anime/typeorm/repositories/AnimeRepository";
import VoiceActorRepository from "@modules/voice_actors/typeorm/repositories/VoiceActorRepository";
import AppError from "@shared/errors/AppError";

interface IAnime {
  id: string;
  isMainCharacter: boolean;
}
interface IRequest {
  actor_id: string;
  anime: IAnime[];
}

export default class CreateCharacterService {
  public async execute({ actor_id, anime }: IRequest): Promise<Character> {
    const characterRepository = getCustomRepository(CharacterRepository);
    const animeRepository = getCustomRepository(AnimeRepository);
    const actorsRepository = getCustomRepository(VoiceActorRepository);

    const actorExists = await actorsRepository.findById(actor_id);
    if (!actorExists) {
      throw new AppError("Could not find any voice actor with the given ids.");
    }

    const animeExist = await animeRepository.findAllByIds(anime);
    if (!animeExist.length) {
      throw new AppError("Could not find any anime series with the given ids.");
    }

    const existAnimeIds = animeExist.map((anime) => anime.id);
    const checkInexistentSeries = anime.filter(
      (series) => !existAnimeIds.includes(series.id)
    );
    if (!existAnimeIds.length) {
      throw new AppError(
        `Could not find series ${checkInexistentSeries[0].id}`
      );
    }

    const serializerAnime = anime.map((series) => ({
      anime_id: series.id,
      isMainCharacter: series.isMainCharacter,
    }));

    const character = await characterRepository.createCharacter({
      voiceActor: actorExists,
      anime: serializerAnime,
    });

    return character;
  }
}
