const express = require('express');
const sequelize = require('./config/database');
const todosRoutes = require('./routes/todos');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/todos', todosRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Todo Tracker API',
    version: '1.0.0',
    endpoints: {
      'GET /todos': 'Get all todos',
      'POST /todos': 'Create a new todo',
      'PUT /todos/:id': 'Update a todo',
      'DELETE /todos/:id': 'Delete a todo',
    },
  });
});

app.use(errorHandler);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync({ alter: false });
    console.log('Database models synchronized.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();

