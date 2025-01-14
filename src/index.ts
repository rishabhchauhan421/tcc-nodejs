import mongoose from 'mongoose';
import { app } from './app';
import { BadRequestError } from './errors/bad-request-error';

const startup = async () => {
  // if (!process.env.JWT_KEY) {
  //   throw new BadRequestError('JWT Must be defined');
  // }
  // if (!process.env.MONGO_URI) {
  //   throw new Error('MONGO_URI must be defined');
  // }

  // try {
  //   await mongoose.connect(process.env.MONGO_URI);
  //   console.log('Connected to Auth MongoDB');
  // } catch (e) {
  //   console.error(e);
  // }

  app.listen(3003, () => {
    console.log('Listening on port 3003!');
  });
};

startup();
