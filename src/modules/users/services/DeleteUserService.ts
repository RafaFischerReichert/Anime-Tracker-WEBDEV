import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";

interface IRequest {
  id: string;
}

export default class DeleteAnimeService {
  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(id);
    if (!user) {
      throw new AppError("Series not found.");
    }
    await userRepository.remove(user);
  }
}
