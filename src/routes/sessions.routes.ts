import { Request, Response, Router } from 'express';
import AuthenticateUserService from '../service/AuthenticateUserService';

const sessionsRouter = Router();
sessionsRouter.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });
  delete user.password;
  return response.json({ user, token });
});

export default sessionsRouter;
