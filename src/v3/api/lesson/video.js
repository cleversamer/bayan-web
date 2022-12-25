/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v3/auth/storage";

const getLessonVideo = async (lessonId) => {
  return await client.get(`/lessons/video/${lessonId}`);
};

const createVideo = async (lessonId, title, description, video, type, url) => {
  const formData = new FormData();
  formData.append("lessonId", lessonId);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("video", video);
  formData.append("type", type);
  formData.append("url", url);

  return await client.post("/lessons/video", formData, {
    headers: { Authorization: authStorage.getToken() },
    "Content-Type": "multipart/form-data",
  });
};

export default {
  getLessonVideo,
  createVideo,
};
