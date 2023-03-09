import questionsModel from "../models/questions-model.js";
import ApiError from "../exceptions/api-error.js";

export const addQuestion = async (question, answer) => {
  const questionCandidate = await questionsModel.findOne({
    question: question,
  });

  if (questionCandidate) {
    throw ApiError.BadRequest(`Такой вопрос :${question} уже существует`);
  }

  const questionItem = await questionsModel.create({
    question: question,
    answer: answer,
  });
  return questionItem;
};

export const getQuestions = async () => {
  const questions = await questionsModel.find();
  return questions;
};
