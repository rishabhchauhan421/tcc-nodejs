import express from 'express';
import { json } from 'body-parser';
//to bypass custom errors handling with async
import 'express-async-errors';

import { sendNotificationRouter } from './routes/send-order-notification';
// import { signinRouter } from './routes/signin';
// import { signoutRouter } from './routes/signout';
// import { signupRouter } from './routes/signup';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import cookieSession from 'cookie-session';

const app = express();

//Adding Cookie Support
app.set('trust proxy', 1);

app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV != 'test',
  })
);

app.use(sendNotificationRouter);
// app.use(signinRouter);
// app.use(signoutRouter);
// app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

// app.use(errorHandler);

export { app };
