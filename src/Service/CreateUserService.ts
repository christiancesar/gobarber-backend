import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../error/AppError';

interface ReqiestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: ReqiestDTO): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email addres already used.');
    }

    const hasPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hasPassword,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
