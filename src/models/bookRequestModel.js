// const mongoose = require("mongoose");

// const bookRequestSchema = new mongoose.Schema({
//   // user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
//   books: [
//     {
//       title: { type: String, required: true },
//       author: { type: String },
//     },
//   ],
//   phoneNumber: { type: String, required: true },
//   status: {
//     type: String,
//     enum: ["Pending", "Reviewed", "Completed"],
//     default: "Pending",
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("BookRequest", bookRequestSchema);




const mongoose = require("mongoose");

const bookRequestSchema = new mongoose.Schema({

  books: [
    {
      title: { type: String, required: true },
      author: { type: String },
    },
  ],
  phoneNumber: { type: String, required: true },

  // Add optional fields:
  schoolName: { type: String },
  studentName: { type: String },

  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Completed"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BookRequest", bookRequestSchema);
