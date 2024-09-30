
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

//parsers
app.use(express.json());

app.use(cors({ origin: ['http://localhost:3000'] }));

app.use(cookieParser())

app.use('/api/v1', router);


app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API',
  });
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
