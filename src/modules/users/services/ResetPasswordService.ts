import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
//da biblioteca que importamos
import { isAfter, addHours } from "date-fns";

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const usersTokensRespository = getCustomRepository(UserTokensRepository);

    const userToken = await usersTokensRespository.findByToken(token);
    if (!userToken) {
      throw new AppError("User Token does not exists.");
    }

    const user = await userRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError("User does not exists.");
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired.");
    }

    user.password = await hash(password, 8);
    await userRepository.save(user);
  }
}
