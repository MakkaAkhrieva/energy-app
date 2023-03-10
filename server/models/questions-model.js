import mongoose from "mongoose";
const QuestionsSchema = new mongoose.Schema({
  question: { type: String, unique: true, required: true },
  answer: { type: String, required: true },
});

export default mongoose.model("Questions", QuestionsSchema);
