import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IResquest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IResquest): Promise<User[]> {
    const user = await this.usersRepository.findAllProvides({
      except_user_id: user_id,
    });

    return user;
  }
}

export default ListProvidersService;