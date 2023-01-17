import express from 'express';
import ErrorMiddleware from './middlewares/error/errorMiddleware';
import routes from './Routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use(ErrorMiddleware);

export default app;
