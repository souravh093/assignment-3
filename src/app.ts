import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFroundRoute';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'https://bike-rental-client-zeta.vercel.app',
      'http://localhost:5173',
      'https://api.imgbb.com/1/upload',
    ],
    credentials: true,
  }),
);

// app routes
app.use('/api', router);

// global error handle zod, mongoose, custom error, error, cast error etc..
app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Bike Rental Server Running...',
  });
});

// not found route
app.use(notFoundRoute);

export default app;
