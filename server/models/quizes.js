const mongoose = require("mongoose");

const QuizQuestions = new mongoose.Schema(
  {
    category: { type: String, required: true },
    question: { type: String, required: true },
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    option3: { type: String, required: true },
    option4: { type: String, required: true },
    date: { type: Date, default: Date.now },
    score: { type: Number }
  },
  { collection: "quiz-questions" }
);

const model = mongoose.model("QuizQuestions", QuizQuestions);

module.exports = model;
