/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v2/auth/storage";

const getLessonDocument = async (lessonId) => {
  return await client.get(`/lessons/${lessonId}`);
};

const createDocument = async (lessonId, title, file) => {
  const formData = new FormData();
  formData.append("lessonId", lessonId);
  formData.append("title", title);
  formData.append("file", file);

  return await client.post("/lessons/document", formData, {
    headers: { Authorization: authStorage.getToken() },
    "Content-Type": "multipart/form-data",
  });
};

export default {
  getLessonDocument,
  createDocument,
};
