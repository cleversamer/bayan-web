/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v3/auth/storage";

const getLevelGrades = async (levelId) => {
  return await client.get(`/grades?levelId=${levelId}`);
};

const createGrade = async (levelId, number, photo) => {
  const formData = new FormData();
  formData.append("levelId", levelId);
  formData.append("number", number);
  formData.append("photo", photo);

  return await client.post("/grades", formData, {
    headers: {
      Authorization: authStorage.getToken(),
      "Content-Type": "multipart/form-data",
    },
  });
};

export default {
  getLevelGrades,
  createGrade,
};
