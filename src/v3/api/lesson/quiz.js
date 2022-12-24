/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v2/auth/storage";

const getLessonQuiz = async (lessonId) => {
  return await client.get(`/lessons/quiz/${lessonId}`);
};

const createQuiz = async (lessonId, title) => {
  return await client.post(
    "/lessons/quiz",
    { lessonId, title },
    { headers: { Authorization: authStorage.getToken() } }
  );
};

const createQuestion = async (quizId, title, options = [], answer, photo) => {
  const formData = new FormData();
  formData.append("quizId", quizId);
  formData.append("title", title);
  formData.append("answer", answer);
  formData.append("photo", photo);
  for (let option of options) {
    formData.append("options", option);
  }

  return await client.post("/lessons/questions", formData, {
    headers: { Authorization: authStorage.getToken() },
    "Content-Type": "multipart/form-data",
  });
};

export default {
  getLessonQuiz,
  createQuiz,
  createQuestion,
};
