import User from "@modules/users/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import path from "path";
import { getCustomRepository } from "typeorm";
import upladConfig from "@config/upload";
import fs from "fs";
import UserRepository from "../typeorm/repositories/UserRepository";

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new AppError("User Not Found.");
    }

    //verificar se o usuário tem avatar
    if (user.avatar) {
      //importar path na mão e o uploadConfig
      const userAvatarFilePath = path.join(upladConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        //remove o arquivo
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    await userRepository.save(user);
    return user;
  }
}
