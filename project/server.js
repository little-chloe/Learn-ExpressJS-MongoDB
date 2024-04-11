const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down . . .');
  console.log(err.name, err.message);
  process.exit(1);
});

const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(
    process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
  )
  .then((connect) => {
    console.log('DB connection succesful!');
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down . . .');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
