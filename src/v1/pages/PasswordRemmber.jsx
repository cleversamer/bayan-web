import React, { useEffect, useState } from "react";
import { BsPerson } from "react-icons/bs";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineLock } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";

const PasswordRemmber = () => {
  const [sended, setSended] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [messageInfo, setMessageInfo] = useState("");
  const [code, setCode] = useState("");
  const [disable, setDisabled] = useState(false);
  const [isSeenPass1, setIsSeenPass1] = useState(false);
  const [isSeenPass2, setIsSeenPass2] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { setErrorMessage } = UserAuth();

  async function handle(e) {
    e.preventDefault();
    setDisabled(true);
    setTimeout(function () {
      setDisabled(false);
    }, 5000);
    api
      .get(`users/forgot-password/?email=${email}`)
      .then((res) => {
        setSended(true);
      })
      .catch((e) => {
        setMessageInfo(e.response.data.message.ar);
      });
  }
  async function finalHandling(e) {
    e.preventDefault();
    setDisabled(true);
    setTimeout(function () {
      setDisabled(false);
    }, 9000);
    const obj = {
      email: email,
      code: code,
      newPassword: password,
    };
    if (password === passwordConfirmation) {
      if (code.length > 0) {
        api
          .post("/users/forgot-password", obj)
          .then((response) => {
            setMessageInfo("");
            navigate("/signin");
          })
          .catch((e) => {
            setMessageInfo(e.response.data.message.ar);
          });
      }
    } else {
      setMessageInfo("كلمة المرور غير متطابقة");
    }
  }

  useEffect(() => {
    setErrorMessage("");
  }, []);
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
          src="/assets/logo.png"
          alt="logo"
          className="w-[245.69px] bg-white rounded-lg px-6 py-4"
        />
      </div>
      <div className=" w-full lg:w-[60%]  h-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-[100%]">
          <img src="/assets/logo.png" alt="logo" className="w-[65.69px]" />
        </div>
        <div className="w-full md:w-[552px] mx-auto mt-[28px] shadow-xl rounded-md p-3">
          <h2 className="w-fit mx-auto text-[#26ABBB] "> نسيت كلمة المرور </h2>
          {!sended ? (
            <form className="py-[14px] px-[72px]" onSubmit={handle}>
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
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg py-2 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
                />
              </label>
              <p className="m-2 text-sm text-[red] w-full text-center font-extrabold block">
                {messageInfo}
              </p>
              <button
                className="bg-[#26ABBB] w-full rounded-md p-2 text-white mt-[31px] "
                disabled={disable}
              >
                ارسال
              </button>
            </form>
          ) : (
            <form className="py-[14px] px-[72px]" onSubmit={finalHandling}>
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
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full rounded-lg py-2 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
                />
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
                  type={isSeenPass1 ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password1"
                  className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
                />
                <AiOutlineEye
                  className=" w-8 h-4 absolute top-1/2 transform -translate-y-1/2 left-3"
                  onClick={() => setIsSeenPass1((pre) => !pre)}
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
                  type={isSeenPass2 ? "text" : "password"}
                  name="passwordensour"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  id="password2"
                  className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
                />
                <AiOutlineEye
                  className=" w-8 h-4 absolute top-1/2 transform -translate-y-1/2 left-3"
                  onClick={() => setIsSeenPass2((pre) => !pre)}
                />
              </label>
              <p className="m-2 text-sm text-[red] w-full text-center font-extrabold block">
                {messageInfo}
              </p>
              <button
                className="bg-[#26ABBB] w-full rounded-md p-2 text-white mt-[31px]"
                disabled={disable}
              >
                ارسال
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordRemmber;
