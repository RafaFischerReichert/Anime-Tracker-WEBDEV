import { EntityRepository, Repository } from "typeorm";
import VoiceActor from "../entities/VoiceActor";

@EntityRepository(VoiceActor)
export default class VoiceActorRepository extends Repository<VoiceActor> {
  public async findByName(name: string): Promise<VoiceActor | undefined> {
    const actor = await this.findOne({
      where: {
        name,
      },
    });
    return actor;
  }

  public async findById(id: string): Promise<VoiceActor | undefined> {
    const actor = await this.findOne({
      where: {
        id,
      },
    });
    return actor;
  }

  public async findByWebsite(website: string): Promise<VoiceActor | undefined> {
    const actor = await this.findOne({
      where: {
        website,
      },
    });
    return actor;
  }
}
