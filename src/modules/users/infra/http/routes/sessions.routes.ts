import { Request, Response, Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();
sessionsRouter.post('/', async (request: Request, response: Response) => {
  const usersRepository = new UsersRepository();
  const { email, password } = request.body;
  const authenticateUserService = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });
  delete user.password;
  return response.json({ user, token });
});

export default sessionsRouter;
