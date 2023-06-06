const express = require('express');
const http = require('http');
const io = require('socket.io');
const session = require('express-session'); // Import express-session
const Mongo = require('mongodb');

const app = express();
const server = http.createServer(app);
const socketIo = io(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const MongoClient = Mongo.MongoClient;
const url = "mongodb://localhost:27017/tasks";
const client = new MongoClient(url);

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  // Other session options...
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(async (req, res, next) => {
  await client.connect();
  const database = await client.db('tasks');
  global.tasks = database.collection('tasks');
  next();
});

app.use(require('cors')({
  origin: 'http://localhost:3000',
}));
app.use('/authentication', require('./routes/authentication'));
app.use('/tasks', require('./routes/tasks'));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
