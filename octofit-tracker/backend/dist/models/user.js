import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    profile: {
        age: Number,
        goals: [String],
        preferredWorkouts: [String],
    },
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
export default User;
