import mongoose from "mongoose";
const StationSchema = new mongoose.Schema({
  name: { type: String },
  location: { type: Object, unique: true, required: true },
  address: { type: String, unique: true, required: true },
});

export default mongoose.model("Station", StationSchema);
