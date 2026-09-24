import { Router } from 'express';

import Workout from '../models/workout.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 }).lean();
    response.json(workouts);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const workout = await Workout.create(request.body);
    response.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

export default router;