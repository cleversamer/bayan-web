/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v2/auth/storage";

const getAllLevels = async () => {
  return await client.get("/levels");
};

const createLevel = async (title, photo) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("photo", photo);

  return await client.post("/levels", formData, {
    headers: {
      Authorization: authStorage.getToken(),
      "Content-Type": "multipart/form-data",
    },
  });
};

export default {
  getAllLevels,
  createLevel,
};
