/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v2/auth/storage";

const getSeasonSubjects = async (seasonId) => {
  return await client.get(`/subjects?seasonId=${seasonId}`);
};

const createSubject = async (
  seasonId,
  title,
  videoType,
  video,
  videoURL,
  photo
) => {
  const formData = new FormData();
  formData.append("seasonId", seasonId);
  formData.append("title", title);
  formData.append("videoType", videoType);
  formData.append("video", video);
  formData.append("videoURL", videoURL);
  formData.append("photo", photo);

  return await client.post("/subjects", formData, {
    headers: {
      Authorization: authStorage.getToken(),
      "Content-Type": "multipart/form-data",
    },
  });
};

export default {
  getSeasonSubjects,
  createSubject,
};
