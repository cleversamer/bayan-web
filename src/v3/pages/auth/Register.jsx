/* eslint-disable react/jsx-no-target-blank */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "v2/auth/useAuth";
import authApi from "v2/api/user/auth";
import storage from "v2/auth/storage";
import toast from "v2/services/toast";

import WhatsApp from "v2/components/WhatsApp";
import PopupMessage from "v2/components/PopupMessage";

import { FcGoogle } from "react-icons/fc";
import { BsPerson } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone, AiOutlineLock, AiOutlineEye } from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+956",
    password1: {
      text: "",
      visible: false,
    },
    password2: {
      text: "",
      visible: false,
    },
    submitting: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, submitting: true });

    const {
      email,
      name,
      countryCode,
      phone,
      password1: { text: password },
    } = formData;

    console.log(countryCode + phone);

    authApi
      .registerWithEmail(email, password, name, countryCode + phone)
      .then((res) => {
        const { user, token } = res.data;
        login(user, token);
        storage.storeToken(token);
        navigate("/verify");
      })
      .catch((err) => {
        toast.showError(err?.response?.data?.message?.ar || err.message);
      })
      .finally(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          countryCode: "+956",
          password1: {
            text: "",
            visible: false,
          },
          password2: {
            text: "",
            visible: false,
          },
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

  const handlePasswordChange = (key) => (e) =>
    setFormData({
      ...formData,
      [key]: { ...formData[key], text: e.target.value },
    });

  const togglePasswordVisible = (key) => () =>
    setFormData({
      ...formData,
      [key]: { ...formData[key], visible: !formData[key].visible },
    });

  return (
    <div className="flex items-center   justify-between h-[100vh] w-[100%] ">
      {formData.submitting && (
        <PopupMessage message="أهلاً بك في منصة بيان التعليمية" />
      )}

      <div className="px-6 hidden lg:w-[40%] h-[100vh] bg-[#26ABBB]  lg:flex  flex-col justify-center items-center relative">
        <img
          src="/assets/Group 600.png"
          alt="bgimg"
          className="absolute w-full  bottom-0 right-0  object-cover"
        />

        <p className=" text-white text-5xl w-fit mx-auto text-center   ">
          {" "}
          إنطلق مع بيان نحو القمة{" "}
        </p>

        <p className="text-right text-white text-4xl w-fit mx-auto ">
          إنشاء حساب جديد
        </p>

        <img
          src="/assets/logo-lg.png"
          alt="logo"
          className="w-[245.69px]  bg-white rounded-lg px-6 py-4"
        />
      </div>

      <div className="w-full lg:w-[60%] h-[100vh]   flex flex-col items-center justify-center">
        <Link to="/">
          <div className="flex items-center justify-center w-[100%]">
            <img src="/assets/logo-md.png" alt="logo" className="w-[65.69px]" />
          </div>
        </Link>

        <div className="w-full md:w-[552px] mx-auto  shadow-xl rounded-md py-[10px]">
          {" "}
          <h2 className="w-fit mx-auto text-[#26ABBB] text-[20px] ">
            تسجيل جديد{" "}
          </h2>
          <h5 className="hidden lg:block text-[#9CA3AF] text-right px-[63px]  text-[15px]">
            المعلومات الشخصية
          </h5>{" "}
          <form className=" px-[72px] " onSubmit={handleSubmit}>
            {" "}
            <p className="text-[#363535] text-right p-0 m-0 my-1">
              الاسم ثلاثي
            </p>{" "}
            <label
              htmlFor="name"
              className="relative text-gray-400 focus-within:text-gray-600 block"
            >
              <BsPerson
                size={15}
                className="pointer-events-none w-8 h-4 absolute top-1/2 transform -translate-y-1/2 right-3"
              />

              <input
                type="text"
                onChange={handleChange("name")}
                value={formData.name}
                id="name"
                className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
              />
            </label>
            <p className="text-[#363535] text-right p-0 m-0 my-2">
              البريدالالكتروني
            </p>
            <label
              htmlFor="email"
              className="relative text-gray-400 focus-within:text-gray-600 block"
            >
              <HiOutlineMail
                size={15}
                className="pointer-events-none w-8 h-4 absolute top-1/2 transform -translate-y-1/2 right-3"
              />

              <input
                type="email"
                onChange={handleChange("email")}
                value={formData.email}
                name="email"
                id="email"
                className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
              />
            </label>
            <p className="text-[#363535] text-right p-0 m-0 my-2">
              {" "}
              رقم الهاتف
            </p>
            <label
              htmlFor="phone"
              className="relative text-gray-400 focus-within:text-gray-600 block"
            >
              <AiOutlinePhone
                size={15}
                className="pointer-events-none w-8 h-4 absolute top-1/2 transform -translate-y-1/2 right-3"
              />

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
            <p className="text-[#363535] text-right p-0 m-0 my-2">
              كلمة المرور
            </p>
            <label
              htmlFor="password"
              className="relative text-gray-400 focus-within:text-gray-600 block"
            >
              <AiOutlineLock
                size={15}
                className="pointer-events-none w-8 h-4 absolute top-1/2 transform -translate-y-1/2 right-3"
              />

              <input
                type={formData.password1.visible ? "text" : "password"}
                onChange={handlePasswordChange("password1")}
                value={formData.password1.text}
                name="password"
                id="password1"
                className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
              />

              <AiOutlineEye
                className=" w-8 h-4 absolute top-1/2 transform -translate-y-1/2 left-3"
                onClick={togglePasswordVisible("password1")}
              />
            </label>
            <p className="text-[#363535] text-right p-0 m-0 my-2">
              تأكيد كلمة المرور
            </p>
            <label
              htmlFor="password2"
              className="relative text-gray-400 focus-within:text-gray-600 block"
            >
              <AiOutlineLock
                size={15}
                className="pointer-events-none w-8 h-4 absolute top-1/2 transform -translate-y-1/2 right-3"
              />

              <input
                type={formData.password2.visible ? "text" : "password"}
                name="passwordensour"
                onChange={handlePasswordChange("password2")}
                value={formData.password2.text}
                id="password2"
                className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
              />

              <AiOutlineEye
                className=" w-8 h-4 absolute top-1/2 transform -translate-y-1/2 left-3"
                onClick={togglePasswordVisible("password2")}
              />
            </label>
            <p className="w-fit mx-auto text-[#363535] my-[10px] text-center">
              بالتسجيل أقر بأني قرأت شروط الاستخدام وأوافق عليها
            </p>
            <button className="bg-[#26ABBB] w-full rounded-md p-1 text-white">
              تسجيل
            </button>
            <Link
              to="/signupWithGoogle"
              className="bg-[#EBEBEB] w-full rounded-md p-1 flex justify-center no-underline items-center gap-[7px] mt-[10px] text-black"
            >
              <FcGoogle /> Google{" "}
            </Link>
            <div className="flex justify-center items-center gap-[5px] pt-[5px]">
              <Link to="/signin" className="text-[#26ABBB] no-underline">
                {" "}
                تسجيل دخول{" "}
              </Link>

              <p className="p-0 m-0"> لديك حساب ؟ </p>
            </div>
          </form>
        </div>
      </div>

      <WhatsApp />
    </div>
  );
};

export default Register;
