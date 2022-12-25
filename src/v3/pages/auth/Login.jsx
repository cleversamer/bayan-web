/* eslint-disable react/jsx-no-target-blank */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "v3/auth/useAuth";
import authApi from "v3/api/user/auth";
import storage from "v3/auth/storage";
import toast from "v3/services/toast";

import WhatsApp from "v3/components/WhatsApp";
import PopupMessage from "v3/components/PopupMessage";

import { BsPerson } from "react-icons/bs";
import { AiOutlineLock } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    submitting: false,
  });

  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    setFormData({ ...formData, submitting: true });

    const { emailOrPhone, password } = formData;
    authApi
      .loginWithEmail(emailOrPhone, password)
      .then((res) => {
        const { user, token } = res.data;

        login(user, token);
        storage.storeToken(token);

        navigate("/");
      })
      .catch((err) => {
        toast.showError(err?.response?.data?.message?.ar || err.message);
      })
      .finally(() => {
        setFormData({
          emailOrPhone: "",
          password: "",
          submitting: false,
        });
      });
  };

  const handleLoginWithGoogle = (e) => {
    e.preventDefault();
    setFormData({ ...formData, submitting: true });

    authApi
      .loginWithGoogle()
      .then((res) => {
        const { user, token } = res.data;
        login(user, token);
        storage.storeToken(token);
        navigate("/");
      })
      .catch((err) => {
        toast.showError(err.response.data.message.ar);
        setFormData({
          emailOrPhone: "",
          password: "",
          submitting: false,
        });
      });
  };

  const handleChange = (key) => (e) =>
    setFormData({ ...formData, [key]: e.target.value });

  return (
    <div className="flex items-center justify-between h-screen w-[100%] ">
      {formData.submitting && (
        <PopupMessage message="أهلاً بك في منصة بيان التعليمية" />
      )}

      <div className="px-6 hidden lg:w-[40%] h-full bg-[#26ABBB]  lg:flex  flex-col justify-center items-center relative">
        <img
          src="/assets/Group 600.png"
          alt="bgimg"
          className="absolute w-full bottom-0 right-0  object-cover"
        />

        <p className="text-right text-white text-5xl w-fit mx-auto ">
          {" "}
          إنطلق مع بيان نحو القمة{" "}
        </p>

        <p className="text-right text-white text-4xl w-fit mx-auto">
          تسجيل دخول{" "}
        </p>

        <img
          src="/assets/logo-lg.png"
          alt="logo"
          className="w-[245.69px] bg-white rounded-lg px-6 py-4"
        />
      </div>

      <div className=" w-full lg:w-[60%] h-full  flex flex-col items-center justify-center">
        <Link to="/">
          <div className="flex items-center justify-center w-[100%]">
            <img src="/assets/logo-md.png" alt="logo" className="w-[65.69px]" />
          </div>
        </Link>

        <div className="w-full md:w-[552px] mx-auto mt-[28px] shadow-xl rounded-md">
          <h2 className="w-fit mx-auto text-[#26ABBB] ">تسجيل دخول </h2>

          <form className="py-[14px] px-[72px]" onSubmit={handleLoginWithEmail}>
            <p className="text-[#363535] text-right p-0 my-[10px] ">
              البريد الإلكتروني أو رقم الهاتف
            </p>

            <label
              htmlFor="name"
              className="relative text-gray-400 focus-within:text-gray-600 block"
            >
              <BsPerson className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-3" />

              <input
                onChange={handleChange("emailOrPhone")}
                value={formData.emailOrPhone}
                type="email"
                id="name"
                className="w-full rounded-lg py-2 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
              />
            </label>

            <p className="text-[#363535] text-right p-0 my-[10px]">
              كلمة المرور{" "}
            </p>

            <label
              htmlFor="password"
              className="relative text-gray-400 focus-within:text-gray-600 block"
            >
              <AiOutlineLock className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-3" />

              <input
                onChange={handleChange("password")}
                value={formData.password}
                type="password"
                name="password"
                id="password"
                className="w-full rounded-lg py-2 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
              />
            </label>

            <div className="flex justify-between items-center py-3">
              <Link
                to="/passwordRemmber"
                className="text-[#363535] no-underline"
              >
                نسيت كلمة المرور ؟
              </Link>

              <label htmlFor="remmberMe">
                تذكرني
                <input
                  type="checkbox"
                  id="remmberMe"
                  name="remmberMe"
                  value="true"
                  className="ml-2"
                />
              </label>
            </div>

            <button className="bg-[#26ABBB] w-full rounded-md p-2 text-white mt-[16px]">
              دخول
            </button>

            <button
              className="bg-[#EBEBEB] w-full rounded-md p-1 flex justify-center no-underline items-center gap-[7px] mt-[10px] text-black"
              onClick={handleLoginWithGoogle}
            >
              <FcGoogle /> Google{" "}
            </button>

            <div className="flex justify-center items-center gap-[10px] pt-[34px]">
              <Link to="/signup" className="text-[#26ABBB]  no-underline">
                {" "}
                ليس لديك حساب ؟{" "}
              </Link>

              <p className="p-0 m-0"> إنشاء حساب </p>
            </div>
          </form>
        </div>
      </div>

      <WhatsApp />
    </div>
  );
};

export default Login;
