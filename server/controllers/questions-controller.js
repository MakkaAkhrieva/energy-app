import * as questionService from "../service/question-service.js";

export const addQuestion = async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    const questionData = await questionService.addQuestion(question, answer);
    return res.json(questionData);
  } catch (error) {
    next(error);
  }
};

export const getQuestions = async (req, res, next) => {
  try {
    const questions = await questionService.getQuestions();
    res.json(questions);
  } catch (error) {
    next(error);
  }
};
