import mongoose from "mongoose";
const StationSchema = new mongoose.Schema({
  stationId: { type: String, unique: true, required: true },
  name: { type: String },
  location: { type: Object, unique: true, required: true },
  address: { type: String, unique: true, required: true },
  plugType: { type: String, required: true, default: "Type2" },
  power: { type: Number, required: true, default: 22 },
  price: { type: Number, required: true, default: 0.4 },
});

export default mongoose.model("Station", StationSchema);
