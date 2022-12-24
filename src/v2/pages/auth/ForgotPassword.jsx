import { useState } from "react";
import { Link } from "react-router-dom";

import ForgotPasswordForm from "v2/components/auth/ForgotPasswordForm";
import ResetPasswordForm from "v2/components/auth/ResetPasswordForm";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ codeSent: false, email: "" });

  return (
    <div className="flex items-center justify-between h-[100vh] w-[100%] ">
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

        <p className="text-right text-white text-4xl w-fit mx-auto ">
          {" "}
          نسيت كلمة المرور
        </p>

        <img
          src="/assets/logo-lg.png"
          alt="logo"
          className="w-[245.69px] bg-white rounded-lg px-6 py-4"
        />
      </div>

      <div className=" w-full lg:w-[60%]  h-full flex flex-col items-center justify-center">
        <Link to="/">
          <div className="flex items-center justify-center w-[100%]">
            <img src="/assets/logo-md.png" alt="logo" className="w-[65.69px]" />
          </div>
        </Link>

        <div className="w-full md:w-[552px] mx-auto mt-[28px] shadow-xl rounded-md p-3">
          <h2 className="w-fit mx-auto text-[#26ABBB] "> نسيت كلمة المرور </h2>

          {formData.codeSent ? (
            <ResetPasswordForm email={formData.email} />
          ) : (
            <ForgotPasswordForm
              onCodeSent={(email) => setFormData({ email, codeSent: true })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
