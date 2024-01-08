const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: "Untitled",
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    default: "General",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user", // Reference to the User model
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("notes", NotesSchema);
