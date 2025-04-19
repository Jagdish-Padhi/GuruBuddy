import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  teacherId: String,  
  day: String,
  from: String,
  to: String,
  subject: String,
  division: String
});

export default mongoose.model('Schedule', ScheduleSchema);
