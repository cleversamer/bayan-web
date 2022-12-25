/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v3/auth/storage";

const getGradeSeasons = async (gradeId) => {
  return await client.get(`/seasons?gradeId=${gradeId}`);
};

const createSeason = async (gradeId, number, photo) => {
  const formData = new FormData();
  formData.append("gradeId", gradeId);
  formData.append("number", number);
  formData.append("photo", photo);

  return await client.post("/seasons", formData, {
    headers: { Authorization: authStorage.getToken() },
    "Content-Type": "multipart/form-data",
  });
};

export default {
  getGradeSeasons,
  createSeason,
};
