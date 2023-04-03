import { Request, Response } from "express";
import ShowCharacterService from "../services/ShowCharacterService";
import CreateCharacterService from "../services/CreateCharacterService";

export default class CharactersController {
  constructor() {}

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showCharacters = new ShowCharacterService();
    const character = await showCharacters.execute({ id });
    return response.json(character);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, actor_id, anime } = request.body;
    const createCharacter = new CreateCharacterService();
    const character = await createCharacter.execute({ name, actor_id, anime });
    return response.json(character);
  }
}
