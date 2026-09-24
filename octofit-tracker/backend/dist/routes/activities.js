import { Router } from 'express';
import Activity from '../models/activity.js';
const router = Router();
router.get('/', async (_request, response, next) => {
    try {
        const activities = await Activity.find()
            .populate('user', 'username name')
            .sort({ completedAt: -1 })
            .lean();
        response.json(activities);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', async (request, response, next) => {
    try {
        const activity = await Activity.create(request.body);
        response.status(201).json(activity);
    }
    catch (error) {
        next(error);
    }
});
export default router;
