import mongoose from "mongoose";

const lastTopicSchema = new mongoose.Schema({
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
    unique: true,
  },
  topic: String,
  submitted:{
    type:Boolean,
    default: false,
  }
});

export default mongoose.model("LastTopic", lastTopicSchema);
