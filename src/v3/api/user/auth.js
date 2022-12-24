/* eslint-disable import/no-anonymous-default-export */
import client from "../client";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "v2/firebase";

const login = async (authType, credentials) => {
  return await client.post("/auth/login", {
    ...credentials,
    authType,
  });
};

const loginWithEmail = async (emailOrPhone, password) => {
  return await login("email", { emailOrPhone, password });
};

const loginWithGoogle = async () => {
  const googleUser = await getGoogleUser();
  return await login("google", { googleToken: googleUser.user.accessToken });
};

const register = async (authType, credentials) => {
  return await client.post("/auth/register", {
    ...credentials,
    authType,
  });
};

const registerWithEmail = async (email, password, name, phone) => {
  return await register("email", { email, password, name, phone });
};

const registerWithGoogle = async (phone) => {
  const googleUser = await getGoogleUser();
  return await register("google", {
    phone,
    googleToken: googleUser.user.accessToken,
  });
};

const getGoogleUser = async () => {
  return await signInWithPopup(auth, new GoogleAuthProvider());
};

export default {
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
  registerWithGoogle,
};
