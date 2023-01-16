import mongoose from "mongoose";
const StationSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  location: { type: Object, unique: true, required: true },
});

export default mongoose.model("Station", StationSchema);
