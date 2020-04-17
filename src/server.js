const { PORT } = require('./common/config');
const app = require('./app');
const db = require('./db');

db.connect();

app.listen(PORT, () =>
  console.log(`App is running on http://localhost: ${PORT}`)
);
