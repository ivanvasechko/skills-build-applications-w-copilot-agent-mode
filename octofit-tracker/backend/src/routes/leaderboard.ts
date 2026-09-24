import { Router } from 'express';

import LeaderboardEntry from '../models/leaderboardEntry.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .populate('user', 'username name')
      .populate('team', 'name')
      .sort({ points: -1, updatedAt: 1 })
      .lean();
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const leaderboardEntry = await LeaderboardEntry.create(request.body);
    response.status(201).json(leaderboardEntry);
  } catch (error) {
    next(error);
  }
});

export default router;