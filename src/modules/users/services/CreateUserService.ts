import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import { hash } from 'bcryptjs';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email addres already used.');
    }

    const hasPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hasPassword,
    });
    return user;
  }
}

export default CreateUserService;
