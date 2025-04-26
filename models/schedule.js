import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  day: String,
  from: String,
  to: String,
  subject: String,
  division: String,
});

export default mongoose.model('Schedule', ScheduleSchema);
