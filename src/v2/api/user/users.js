/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import authStorage from "v2/auth/storage";

////////////////////////////// Common APIs //////////////////////////////
const isAuth = async () => {
  return await client.get("/users/isauth", {
    headers: {
      Authorization: authStorage.getToken(),
    },
  });
};

const verifyUser = async (code) => {
  return await client.post(
    "/users/verify",
    { code },
    {
      headers: {
        Authorization: authStorage.getToken(),
      },
    }
  );
};

const resendVerificationCode = async () => {
  return await client.get("/users/verify", {
    headers: {
      Authorization: authStorage.getToken(),
    },
  });
};

const changePassword = async (newPassword) => {
  return await client.post(
    "/users/reset-password",
    { newPassword },
    {
      headers: {
        Authorization: authStorage.getToken(),
      },
    }
  );
};

const getResetPasswordCode = async (email) => {
  return await client.get(`/users/forgot-password/?email=${email}`);
};

const resetPassword = async (email, code, newPassword) => {
  return await client.post("/users/forgot-password", {
    email,
    code,
    newPassword,
  });
};

const updateProfile = async (profileData) => {
  if (!profileData.avatar) {
    delete profileData.avatar;
  }

  const formData = new FormData();
  for (let key in profileData) {
    formData.append(key, profileData[key]);
  }

  return await client.patch("/users/update", formData, {
    headers: {
      Authorization: authStorage.getToken(),
      "Content-Type": "multipart/form-data",
    },
  });
};

////////////////////////////// Student APIs //////////////////////////////
const subscribeToPackage = async (packageId, subjects = []) => {
  return await client.post(
    "/users/subscriptions",
    { packageId, subjects },
    {
      headers: {
        Authorization: authStorage.getToken(),
      },
    }
  );
};

const getMySubscriptions = async () => {
  return await client.get("/subscriptions", {
    headers: { Authorization: authStorage.getToken() },
  });
};

////////////////////////////// Admin APIs //////////////////////////////
const findUser = async (role, emailOrPhone) => {
  return await client.get(`/users/${role}/${emailOrPhone}`, {
    headers: {
      Authorization: authStorage.getToken(),
    },
  });
};

const getUserSubscriptions = async (userId) => {
  return await client.get(`/users/admin/${userId}/subscriptions`, {
    headers: {
      Authorization: authStorage.getToken(),
    },
  });
};

const toggleSubscriptionActive = async (subscriptionId) => {
  return await client.patch(
    "/subscriptions/toggle-active",
    { subscriptionId },
    {
      headers: {
        Authorization: authStorage.getToken(),
      },
    }
  );
};

const toggleSubjectActive = async (subscriptionId, subjectId) => {
  return await client.patch(
    "/subscriptions/toggle-subject-active",
    { subscriptionId, subjectId },
    {
      headers: {
        Authorization: authStorage.getToken(),
      },
    }
  );
};

const toggleSubjectFree = async (subjectId) => {
  return await client.patch(
    "/subjects/toggle-free",
    { subjectId },
    {
      headers: {
        Authorization: authStorage.getToken(),
      },
    }
  );
};

const addSubjectToSubscription = async (subscriptionId, subjectId) => {
  return await client.patch(
    "/subscriptions/add-subject",
    { subscriptionId, subjectId },
    {
      headers: {
        Authorization: authStorage.getToken(),
      },
    }
  );
};

const deleteSubjectFromSubscription = async (subscriptionId, subjectId) => {
  return await client.patch(
    "/subscriptions/delete-subject",
    { subscriptionId, subjectId },
    {
      headers: {
        Authorization: authStorage.getToken(),
      },
    }
  );
};

const updateUserProfile = async (userId, profileData) => {
  const formData = new FormData();
  formData.append("userId", userId);
  for (let key in profileData) {
    formData.append(key, profileData[key]);
  }

  return await client.patch("/users/admin/update-profile", formData, {
    headers: {
      Authorization: authStorage.getToken(),
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateUserRole = async (userId, role) => {
  return await client.patch(
    "/users/admin/change-user-role",
    { userId, role },
    {
      headers: {
        Authorization: authStorage.getToken(),
      },
    }
  );
};

const verifyUserByAdmin = async (userId) => {
  return await client.patch(
    "/users/admin/validate-user",
    { userId },
    {
      headers: {
        Authorization: authStorage.getToken(),
      },
    }
  );
};

export default {
  common: {
    isAuth,
    verifyUser,
    resendVerificationCode,
    changePassword,
    getResetPasswordCode,
    resetPassword,
    updateProfile,
  },
  student: {
    subscribeToPackage,
    getMySubscriptions,
  },
  admin: {
    getUserSubscriptions,
    toggleSubscriptionActive,
    toggleSubjectActive,
    toggleSubjectFree,
    addSubjectToSubscription,
    deleteSubjectFromSubscription,
    updateUserProfile,
    updateUserRole,
    verifyUserByAdmin,
    findUser,
  },
};
