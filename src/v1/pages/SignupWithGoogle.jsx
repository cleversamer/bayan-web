import React, { useEffect, useState } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaWhatsappSquare } from "react-icons/fa";

const SignupWithGoogle = () => {
  const [phone, setPhone] = useState("");
  const { GoogleTokenProvider, setErrorMessage } = UserAuth();
  const [disable, setDisabled] = useState(false);

  useEffect(() => {
    setErrorMessage("");
  }, []);

  const googleHandle = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setTimeout(function () {
      setDisabled(false);
    }, 5000);
    if (phone.length > 0) GoogleTokenProvider(phone);
  };
  return (
    <div className="flex items-center justify-between h-screen w-[100%] ">
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
          src="/assets/logo.png"
          alt="logo"
          className="w-[245.69px] bg-white rounded-lg px-6 py-4"
        />
      </div>
      <div className=" w-full lg:w-[60%] h-full  flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-[100%]">
          <img src="/assets/logo.png" alt="logo" className="w-[65.69px]" />
        </div>
        <div className="w-full md:w-[552px] mx-auto mt-[28px] shadow-xl rounded-md">
          <h2 className="w-fit mx-auto text-[#26ABBB] ">تسجيل جديد </h2>
          <form className="py-[72px] px-[72px]" onSubmit={googleHandle}>
            <p className="text-[#363535] text-right p-0 my-[10px]">
              {" "}
              رقم الجوال{" "}
            </p>
            <label
              htmlFor="phone"
              className="relative text-gray-400 focus-within:text-gray-600 block"
            >
              <AiOutlinePhone className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-3" />
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                name="phone"
                id="phone"
                className="w-full rounded-lg py-2 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
              />
            </label>
            {/* <button className='bg-[#26ABBB] w-full rounded-md p-2 text-white mt-[16px]'>دخول</button> */}
            <button
              className="bg-[#EBEBEB] w-full rounded-md p-1 flex justify-center items-center gap-[7px] mt-[10px] text-black"
              disabled={disable}
            >
              <FcGoogle /> Google{" "}
            </button>
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

export default SignupWithGoogle;
