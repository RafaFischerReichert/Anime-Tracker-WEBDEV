import User from "@modules/users/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const emailExists = await userRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError("Email address already used.");
    }
    const hashedPW = await hash(password, 8)
    const user = userRepository.create({
      name,
      email,
      password: hashedPW,
    });
    await userRepository.save(user);
    return user;
  }
}
