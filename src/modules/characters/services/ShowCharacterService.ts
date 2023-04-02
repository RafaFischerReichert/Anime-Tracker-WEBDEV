import { getCustomRepository } from "typeorm";
import Character from "../typeorm/entities/Character";
import CharacterRepository from "../repositories/CharacterRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

export default class ShowCharacterService {
  public async execute({ id }: IRequest): Promise<Character> {
    const characterRepository = getCustomRepository(CharacterRepository);
    const character = await characterRepository.findById(id);
    if (!character) {
      throw new AppError("Character not found.");
    }
    return character;
  }
}
