import 'dotenv/config';
import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import LeaderboardEntry from '../models/leaderboardEntry.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Seed the octofit_db database with test data');
        console.log('Connected to octofit_db');
        await Promise.all([
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Team.deleteMany({}),
            User.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                username: 'maya_runner',
                name: 'Maya Chen',
                email: 'maya.chen@example.com',
                profile: {
                    age: 29,
                    goals: ['improve endurance', 'run a half marathon'],
                    preferredWorkouts: ['running', 'yoga'],
                },
            },
            {
                username: 'leo_lifts',
                name: 'Leo Martinez',
                email: 'leo.martinez@example.com',
                profile: {
                    age: 34,
                    goals: ['build strength', 'increase mobility'],
                    preferredWorkouts: ['strength training', 'cycling'],
                },
            },
            {
                username: 'aisha_flow',
                name: 'Aisha Patel',
                email: 'aisha.patel@example.com',
                profile: {
                    age: 26,
                    goals: ['stay consistent', 'improve flexibility'],
                    preferredWorkouts: ['pilates', 'hiking'],
                },
            },
            {
                username: 'sam_sprints',
                name: 'Sam Rivera',
                email: 'sam.rivera@example.com',
                profile: {
                    age: 31,
                    goals: ['increase speed', 'boost cardio fitness'],
                    preferredWorkouts: ['interval training', 'rowing'],
                },
            },
        ]);
        const [maya, leo, aisha, sam] = users;
        const teams = await Team.insertMany([
            {
                name: 'Trail Blazers',
                description: 'Outdoor-focused athletes logging miles, hikes, and recovery work.',
                members: [maya._id, aisha._id],
            },
            {
                name: 'Power Pulse',
                description: 'Strength and conditioning crew chasing weekly point goals.',
                members: [leo._id, sam._id],
            },
        ]);
        const [trailBlazers, powerPulse] = teams;
        await Activity.insertMany([
            {
                user: maya._id,
                type: 'Tempo run',
                durationMinutes: 42,
                caloriesBurned: 430,
                completedAt: new Date('2026-09-20T07:30:00Z'),
            },
            {
                user: leo._id,
                type: 'Upper body strength',
                durationMinutes: 55,
                caloriesBurned: 510,
                completedAt: new Date('2026-09-21T18:15:00Z'),
            },
            {
                user: aisha._id,
                type: 'Pilates flow',
                durationMinutes: 35,
                caloriesBurned: 220,
                completedAt: new Date('2026-09-22T12:00:00Z'),
            },
            {
                user: sam._id,
                type: 'Rowing intervals',
                durationMinutes: 38,
                caloriesBurned: 460,
                completedAt: new Date('2026-09-23T06:45:00Z'),
            },
            {
                user: maya._id,
                type: 'Recovery yoga',
                durationMinutes: 25,
                caloriesBurned: 120,
                completedAt: new Date('2026-09-24T09:00:00Z'),
            },
        ]);
        await LeaderboardEntry.insertMany([
            { user: maya._id, team: trailBlazers._id, points: 1480, rank: 1 },
            { user: sam._id, team: powerPulse._id, points: 1395, rank: 2 },
            { user: leo._id, team: powerPulse._id, points: 1320, rank: 3 },
            { user: aisha._id, team: trailBlazers._id, points: 1185, rank: 4 },
        ]);
        await Workout.insertMany([
            {
                title: 'Endurance Builder Run',
                description: 'A steady aerobic run with a short tempo finish for distance goals.',
                difficulty: 'intermediate',
                exercises: ['10 min warm-up jog', '25 min steady run', '8 min tempo finish', '5 min cooldown'],
                suggestedForGoals: ['improve endurance', 'run a half marathon'],
            },
            {
                title: 'Total Strength Circuit',
                description: 'Compound lifts and core work for balanced full-body strength.',
                difficulty: 'advanced',
                exercises: ['deadlifts', 'push press', 'walking lunges', 'plank rows'],
                suggestedForGoals: ['build strength', 'increase mobility'],
            },
            {
                title: 'Mobility Reset',
                description: 'Low-impact mobility and flexibility work for recovery days.',
                difficulty: 'beginner',
                exercises: ['cat-cow', 'worlds greatest stretch', 'hip airplanes', 'childs pose breathing'],
                suggestedForGoals: ['improve flexibility', 'stay consistent'],
            },
            {
                title: 'Cardio Speed Intervals',
                description: 'Short high-intensity intervals for speed and cardiovascular power.',
                difficulty: 'intermediate',
                exercises: ['5 min warm-up', '8 x 45 sec sprint', '90 sec easy recovery', 'cooldown walk'],
                suggestedForGoals: ['increase speed', 'boost cardio fitness'],
            },
        ]);
        const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] = await Promise.all([
            User.countDocuments(),
            Team.countDocuments(),
            Activity.countDocuments(),
            LeaderboardEntry.countDocuments(),
            Workout.countDocuments(),
        ]);
        console.log(`Seeded ${userCount} users, ${teamCount} teams, ${activityCount} activities, ${leaderboardCount} leaderboard entries, and ${workoutCount} workouts.`);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
