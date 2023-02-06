import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  role: { type: String, default: "user" },
  name: { type: String },
  surname: { type: String },
  phone: { type: String, unique: true },
});

export default mongoose.model("User", UserSchema);
