import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import AppError from '@shared/error/AppError';
import '@shared/infra/typeorm';
import '@shared/container/index';

import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/file', express.static(uploadConfig.directory));
app.use(routes);

// Handling Global Error
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started');
});
