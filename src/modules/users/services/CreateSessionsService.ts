import User from "@modules/users/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import UserRepository from "../typeorm/repositories/UserRepository";
import { sign } from "jsonwebtoken";
import authconfig from "@config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    //compare método pronto do bcrypt.
    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/passowrd combination.", 401);
    }

    const token = sign({}, authconfig.jwt.secret, {
      subject: user.id,
      expiresIn: authconfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
