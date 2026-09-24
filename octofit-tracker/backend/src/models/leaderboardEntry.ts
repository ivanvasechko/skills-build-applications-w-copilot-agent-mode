import mongoose from 'mongoose';

const leaderboardEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, min: 1 },
  },
  { timestamps: true },
);

const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntry;