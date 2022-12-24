import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaWhatsappSquare } from "react-icons/fa";

const SignupUsingPhone = () => {
  return (
    <div className="flex items-center justify-between h-[100vh] w-[100%] ">
      <div className="hidden lg:w-[40%] h-full bg-[#26ABBB] lg:flex justify-center items-center relative">
        <p className="text-right text-white text-5xl w-full px-6">
          {" "}
          أدخل رقم الهاتف{" "}
        </p>
      </div>
      <div className=" w-full lg:w-[60%]  h-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-[100%]">
          <img src="/assets/logo.png" alt="logo" className="w-[65.69px]" />
        </div>
        <div
          m
          className="w-full md:w-[552px] mx-auto mt-[28px] shadow-xl rounded-md"
        >
          <h2 className="w-fit mx-auto text-[#26ABBB] "> أدخل رقم الهاتف </h2>
          <form className="py-[14px] px-[72px]">
            <p className="text-[#363535] text-right p-0 my-[10px] ">
              {" "}
              رقم الهاتف
            </p>
            <label
              htmlFor="phone"
              className="relative text-gray-400 focus-within:text-gray-600 block"
            >
              <FcGoogle className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-3" />
              <input
                type="number"
                id="phone"
                className="w-full rounded-lg py-2 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
              />
            </label>
            <button className="bg-[#26ABBB] w-full rounded-md p-2 text-white mt-[31px]">
              انطلق
            </button>
            <div className="flex justify-center items-center gap-[10px] pt-[16px]">
              <Link to="/" className="text-[#26ABBB] decoration-none">
                {" "}
                تسجيل دخول{" "}
              </Link>
              <p className="p-0 m-0"> لديك حساب ؟ </p>
            </div>
          </form>
        </div>
      </div>

      <a
        href="https://wa.me/+970567682999"
        target="_blank"
        className="fixed bottom-0 right-0  md:right-10 hover:text-[#25d366] text-[#25d366] "
      >
        <FaWhatsappSquare size={80} />
      </a>
    </div>
  );
};

export default SignupUsingPhone;
