import { Request, Response } from "express";
import CreateActorService from "../services/CreateActorService";
import DeleteActorService from "../services/DeleteActorService";
import ListActorsService from "../services/ListActorsService";
import ShowActorService from "../services/ShowActorService";
import UpdateActorService from "../services/UpdateActorService";

export default class VoiceActorController {
  constructor() {}

  public async index(request: Request, response: Response): Promise<Response> {
    const listActors = new ListActorsService();
    const actors = await listActors.execute();
    return response.json(actors);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, website } = request.body;
    const createActor = new CreateActorService();
    const actor = await createActor.execute({ name, website });
    return response.json(actor);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showActor = new ShowActorService();
    const actor = await showActor.execute({ id });
    return response.json(actor);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, website } = request.body;
    const { id } = request.params;
    const updateActor = new UpdateActorService();
    const actor = await updateActor.execute({ id, name, website });
    return response.json(actor);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteActor = new DeleteActorService();
    await deleteActor.execute({ id });
    return response.json([]);
  }
}
