import mongoose from "mongoose";

const lastTopicSchema = new mongoose.Schema({
    scheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Schedule'
    },
    date: String,
    topic: String
  });
  

export default mongoose.model("LastTopic", lastTopicSchema)