import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';

const sessionsRouter = Router();
sessionsRouter.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const authenticateUserService = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });
  delete user.password;
  return response.json({ user, token });
});

export default sessionsRouter;
