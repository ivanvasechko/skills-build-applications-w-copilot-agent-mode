import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    exercises: [String],
    suggestedForGoals: [String],
  },
  { timestamps: true },
);

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;