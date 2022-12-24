import React, { useEffect, useState } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { FaWhatsappSquare } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Socil from "../components/Socil";
import { UserAuth } from "../context/AuthContext";
import api from "../api";
import Cookies from "js-cookie";

const Profile = () => {
  const { user } = UserAuth();
  const [userData, setUserData] = useState({
    name: Cookies.get("name"),
    email: Cookies.get("email"),
    phone: Cookies.get("phone"),
  });
  useEffect(() => {
    console.log("in useeffect");
    window.scrollTo(0, 0);
    setUserData({
      name: Cookies.get("name"),
      email: Cookies.get("email"),
      phone: Cookies.get("phone"),
    });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  const updateProfile = (e) => {
    e.preventDefault();
    api
      .patch(`/users/update`, userData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {})
      .catch((e) => {});
  };
  return (
    <>
      <Socil />
      <Navbar target="main" />
      <div className="w-full md:w-[80%] mx-auto my-[80px]">
        <div className=" w-full flex justify-center items-start flex-wrap flex-row-reverse">
          <div className="w-full md:w-[40%] flex flex-col  items-end justify-center ">
            <div className="w-full  md:w-fit flex flex-row-reverse gap-5 justify-end items-center  ">
              {Cookies.get("avatarURL") ? (
                <img
                  src={Cookies.get("avatarURL")}
                  alt=""
                  className="w-[150px] h-[150px] relative rounded-[50%] flex items-center justify-center "
                />
              ) : (
                <>
                  <div className="w-[150px] h-[150px] relative rounded-[50%] flex items-center justify-center bg-[#26ABBB]">
                    {Cookies.get("name")[0].toUpperCase()}
                  </div>
                </>
              )}
            </div>
            <form className="py-[14px]  text-right" onSubmit={updateProfile}>
              <p className="text-[#26ABBB] text-right p-0 my-[10px] text-[20px] font-extrabold ">
                {" "}
                : الاسم ثلاثي
              </p>
              <div className=" text-gray-400 focus-within:text-gray-600  flex justify-end border-[1px] border-solid border-gray-600 items-center gap-3 px-4 py-2 rounded-lg">
                <input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  value={userData.name}
                  className=" rounded-lg    focus:outline-none text-right p-0 m-0 "
                />
                <BsPerson size={30} className="" />
              </div>
              <p className="text-[#26ABBB] text-right p-0 my-[10px] text-[20px] font-extrabold ">
                {" "}
                : البريدالالكتروني{" "}
              </p>
              <div className=" text-gray-400 focus-within:text-gray-600  flex justify-end border-[1px] border-solid border-gray-600 items-center gap-3 px-4 py-2 rounded-lg w-[400px]">
                <input
                  type="email"
                  onChange={handleChange}
                  name="email"
                  value={userData.email}
                  className=" rounded-lg    focus:outline-none text-right p-0 m-0 w-full"
                />
                <HiOutlineMail size={30} className="" />
              </div>
              <p className="text-[#26ABBB] text-right p-0 my-[10px] text-[20px] font-extrabold ">
                {" "}
                : رقم الجوال{" "}
              </p>
              <div className=" text-gray-400 focus-within:text-gray-600  flex justify-end border-[1px] border-solid border-gray-600 items-center gap-3 px-4 py-2 rounded-lg">
                <input
                  type="number"
                  onChange={handleChange}
                  name="phone"
                  value={userData.phone}
                  className=" rounded-lg    focus:outline-none text-right p-0 m-0 "
                />
                <AiOutlinePhone size={30} className="" />
              </div>
              <button className="px-5 py-3 text-white bg-[#26ABBB] no-underline rounded-lg my-8">
                حفظ التعديلات{" "}
              </button>
            </form>
          </div>
          <div className="w-full md:w-[40%] flex flex-col  items-center justify-center text-right ">
            {Cookies.get("role") !== "admin" && (
              <>
                <h1 className="text-[#26ABBB] text-center p-0 my-[10px] text-[30px] font-black ">
                  الباقات المشركة{" "}
                </h1>
                {!JSON.parse(Cookies.get("subscriptions"))?.length ? (
                  <h1 className="text-[#26ABBB] w-full text-center p-8 my-[10px] text-[25px] font-bold ">
                    ... لا يوجد باقات مسجلة{" "}
                  </h1>
                ) : (
                  <div>
                    <div className="bg-white no-underline text-black rounded-3xl  shadow-lg  flex flex-col justify-center items-center w-[300px] p-[15px] min-h-[180px] ">
                      <img
                        src="/package.png"
                        alt=""
                        className="w-[200px] object-cover block"
                      />
                      <p className="p-0  m-0 text-[15px] xl:text-[17px] text-center text-[#8D8D8D]">
                        باقة 3 مواد
                      </p>
                    </div>
                    <p className="text-black px-4 my-[10px] text-[20px]  w-full text-right">
                      : تارخ الاشتراك{" "}
                    </p>
                    <p className="text-black px-4 my-[10px] text-[20px] w-full text-right ">
                      1-1-2022{" "}
                    </p>
                    <p className="text-black px-4 my-[10px] text-[18px] w-full text-right ">
                      متبقي 29 يوم
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <a
        href="https://wa.me/+970567682999"
        target="_blank"
        className="fixed bottom-0 right-0  md:right-10 hover:text-[#25d366] text-[#25d366] "
      >
        <FaWhatsappSquare size={80} />
      </a>
    </>
  );
};

export default Profile;
