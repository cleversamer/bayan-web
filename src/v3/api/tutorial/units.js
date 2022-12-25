/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v3/auth/storage";

const getSubjectUnits = async (subjectId) => {
  return await client.get(`/units?subjectId=${subjectId}`);
};

const createUnit = async (subjectId, title) => {
  return await client.post(
    "/units",
    { subjectId, title },
    { headers: { Authorization: authStorage.getToken() } }
  );
};

export default {
  getSubjectUnits,
  createUnit,
};
