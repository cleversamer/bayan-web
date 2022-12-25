import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PopupMessage from "../PopupMessage";

import useAuth from "v3/auth/useAuth";
import storage from "v3/auth/storage";
import usersApi from "v3/api/user/users";
import toast from "v3/services/toast";

import { AiOutlineEye, AiOutlineLock } from "react-icons/ai";

const ResetPasswordForm = ({ email }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    code: "",
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
      code,
      password1: { text: newPassword },
    } = formData;
    usersApi.common
      .resetPassword(email, code, newPassword)
      .then((res) => {
        const { user, token } = res.data;

        login(user, token);
        storage.storeToken(token);

        navigate("/");
      })
      .catch((err) => {
        toast.showError(err.response.data.message.ar);
      })
      .finally(() => {
        setFormData({
          code: "",
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

  const handleChange = (key) => (e) =>
    setFormData({ ...formData, [key]: e.target.value });

  const togglePasswordVisible = (key) => () =>
    setFormData({
      ...formData,
      [key]: { ...formData[key], visible: !formData[key].visible },
    });

  const handlePasswordChange = (key) => (e) =>
    setFormData({
      ...formData,
      [key]: { ...formData[key], text: e.target.value },
    });

  return (
    <form className="py-[14px] px-[72px]" onSubmit={handleSubmit}>
      {formData.submitting && <PopupMessage />}

      <p className="text-[#363535] text-right p-0 my-[10px] ">
        {" "}
        الكود الذي تم ارساله{" "}
      </p>

      <label
        htmlFor="code"
        className="relative text-gray-400 focus-within:text-gray-600 block"
      >
        <input
          type="number"
          id="number"
          value={formData.code}
          onChange={handleChange("code")}
          className="w-full rounded-lg py-2 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
        />
      </label>

      <p className="text-[#363535] text-right p-0 m-0 my-2">كلمة المرور</p>

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

      <button
        className="bg-[#26ABBB] w-full rounded-md p-2 text-white mt-[31px]"
        disabled={formData.submitting}
      >
        ارسال
      </button>
    </form>
  );
};

export default ResetPasswordForm;
