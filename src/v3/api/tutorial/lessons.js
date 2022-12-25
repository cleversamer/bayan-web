/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v3/auth/storage";

// Requires auth token, but it is optional
// This api call will be always receiving data
const getUnitLessons = async (unitId) => {
  return await client.get(`/lessons/unit/${unitId}`, {
    headers: { Authorization: authStorage.getToken() },
  });
};

const getLessonById = async (lessonId) => {
  return await client.get(`/lessons/${lessonId}`, {
    headers: { Authorization: authStorage.getToken() },
  });
};

const createLesson = async (unitId, title) => {
  return await client.post(
    "/lessons",
    { unitId, title },
    {
      headers: { Authorization: authStorage.getToken() },
    }
  );
};

export default {
  getUnitLessons,
  getLessonById,
  createLesson,
};
