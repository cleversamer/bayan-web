import { useState } from "react";

import PopupMessage from "../PopupMessage";

import usersApi from "v2/api/user/users";
import toast from "v2/services/toast";

import { BsPerson } from "react-icons/bs";

const ForgotPasswordForm = ({ onCodeSent }) => {
  const [formData, setFormData] = useState({ email: "", submitting: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, submitting: true });

    const { email } = formData;
    usersApi.common
      .getResetPasswordCode(email)
      .then((res) => {
        toast.showSuccess(res.data.message.ar);
        onCodeSent(email);
      })
      .catch((err) => {
        toast.showError(err?.response?.data?.message?.ar || err.message);
      })
      .finally(() => {
        setFormData({ email: "", submitting: false });
      });
  };

  const handleChange = (key) => (e) =>
    setFormData({ ...formData, [key]: e.target.value });

  return (
    <form className="py-[14px] px-[72px]" onSubmit={handleSubmit}>
      {formData.submitting && (
        <PopupMessage message="جاري إرسال كود إستعادة كلمة المرور إلى بريدك الإلكتروني" />
      )}

      <p className="text-[#363535] text-right p-0 my-[10px] ">
        {" "}
        البريد الالكتروني{" "}
      </p>

      <label
        htmlFor="phone"
        className="relative text-gray-400 focus-within:text-gray-600 block"
      >
        <BsPerson className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-3" />

        <input
          type="text"
          id="email"
          value={formData.email}
          onChange={handleChange("email")}
          className="w-full rounded-lg py-2 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
        />
      </label>

      <button
        disabled={formData.submitting}
        className="bg-[#26ABBB] w-full rounded-md p-2 text-white mt-[31px] "
      >
        ارسال
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
