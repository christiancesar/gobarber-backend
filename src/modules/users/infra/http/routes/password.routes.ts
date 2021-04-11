import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordController = new ForgotPasswordController();
const passwordRouter = Router();
passwordRouter.post('/forgot', passwordController.create);
passwordRouter.post('/reset', passwordController.create);

export default passwordRouter;
