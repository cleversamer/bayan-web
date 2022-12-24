/* eslint-disable react/jsx-no-target-blank */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "v2/auth/useAuth";
import authApi from "v2/api/user/auth";
import storage from "v2/auth/storage";
import toast from "v2/services/toast";

import WhatsApp from "v2/components/WhatsApp";
import PopupMessage from "v2/components/PopupMessage";

import { AiOutlinePhone } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const RegisterWithGoogle = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    phone: "",
    countryCode: "+965",
    submitting: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, submitting: true });

    const { phone, countryCode } = formData;
    authApi
      .registerWithGoogle(countryCode + phone)
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
          phone: "",
          countryCode: formData.countryCode,
          submitting: false,
        });
      });
  };

  const handleChange = (key) => (e) => {
    let value = e.target.value;

    if (key === "phone") {
      const isMaxNumLength =
        (formData.countryCode === "+965" && formData.phone.length === 8) ||
        (["+970", "+972"].includes(formData.countryCode) &&
          formData.phone.length === 9);

      if (isMaxNumLength && value.length > formData.phone.length) {
        return;
      }
    }

    const body = { ...formData, [key]: value };
    if (key === "countryCode") {
      body.phone = "";
    }

    setFormData(body);
  };

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
          <h2 className="w-fit mx-auto text-[#26ABBB] ">تسجيل جديد </h2>

          <form className="py-[72px] px-[72px]" onSubmit={handleSubmit}>
            <p className="text-[#363535] text-right p-0 my-[10px]">
              {" "}
              رقم الهاتف
            </p>

            <label
              htmlFor="phone"
              className="relative text-gray-400 focus-within:text-gray-600 block"
            >
              <AiOutlinePhone className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-3" />

              <input
                type="number"
                onChange={handleChange("phone")}
                value={formData.phone}
                name="phone"
                id="phone"
                className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14 appearance-none "
              />

              <select
                className="w-[60px] outline-none cursor-pointer absolute top-1/2 transform -translate-y-1/2 left-3"
                onChange={handleChange("countryCode")}
                value={formData.countryCode}
              >
                <option value="+965">+965</option>
                <option value="+970">+970</option>
                <option value="+972">+972</option>
              </select>
            </label>

            <button
              className="bg-[#EBEBEB] w-full rounded-md p-1 flex justify-center items-center gap-[7px] mt-[10px] text-black"
              disabled={formData.submitting}
            >
              <FcGoogle /> Google{" "}
            </button>
          </form>
        </div>
      </div>

      <WhatsApp />
    </div>
  );
};

export default RegisterWithGoogle;
