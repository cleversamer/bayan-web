/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v3/auth/storage";

const getGradePackages = async (gradeId) => {
  return await client.get(`/packages?gradeId=${gradeId}`, {
    Authorization: authStorage.getToken(),
  });
};

const createPackage = async (gradeId, numOfSubjects, price, months) => {
  return await client.post(
    "/packages",
    { gradeId, numOfSubjects, price, months },
    { headers: { Authorization: authStorage.getToken() } }
  );
};

export default {
  getGradePackages,
  createPackage,
};
