import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
import db from './database';
const port = config.port || 3000;

console.log(config);

const app: Application = express();

app.use(express.json());

app.use(morgan('common'));

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'to many requests',
  })
);

app.get('/', (req: Request, res: Response) => {
  // throw new Error('Error exist')
  res.json({
    message: 'hello world',
  });
});

app.post('/', (req: Request, res: Response) => {
  res.json({
    message: 'hello world from post',
    data: req.body,
  });
});

//test database
db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((error) => {
      client.release();
      console.log(error.stack);
    });
});

app.use(errorMiddleware);

app.use((_req: Request, res: Response) => {
  res.json({
    message: 'you are lost, check out the API documentation',
  });
});

app.listen(port, () => {
  console.log('Listening on port');
});

export default app;
