import { Router } from 'express';

import Team from '../models/team.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const teams = await Team.find().populate('members', 'username name').sort({ name: 1 }).lean();
    response.json(teams);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const team = await Team.create(request.body);
    response.status(201).json(team);
  } catch (error) {
    next(error);
  }
});

export default router;