const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        error: 'Title is required',
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
      description: description ? description.trim() : null,
      completed: false,
    });

    res.status(201).json(todo);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: error.errors[0].message,
      });
    }
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({
        error: 'Todo not found',
      });
    }

    if (title !== undefined) {
      if (title.trim() === '') {
        return res.status(400).json({
          error: 'Title cannot be empty',
        });
      }
      todo.title = title.trim();
    }

    if (description !== undefined) {
      todo.description = description ? description.trim() : null;
    }

    if (completed !== undefined) {
      todo.completed = Boolean(completed);
    }

    await todo.save();
    res.json(todo);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: error.errors[0].message,
      });
    }
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({
        error: 'Todo not found',
      });
    }

    await todo.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;

