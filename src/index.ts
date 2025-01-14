import { app } from './app';

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

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
  });
};

startup();
