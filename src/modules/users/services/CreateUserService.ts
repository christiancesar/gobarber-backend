import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashedProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email addres already used.');
    }

    const hasPassword = await this.hashedProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hasPassword,
    });
    return user;
  }
}

export default CreateUserService;
