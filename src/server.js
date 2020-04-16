const { PORT } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

mongoose
  .connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('MongoDB connected');
    mongoose.connection.dropDatabase();
  })
  .catch(error => console.log(error));

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
