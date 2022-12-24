/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AiFillPlayCircle, AiOutlineFullscreenExit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Socil from "../components/Socil";
import { UserAuth } from "../context/AuthContext";
import { FaGlassWhiskey, FaWhatsappSquare } from "react-icons/fa";

const Main = () => {
  const backgrounds = ["/assets/0.jpg", "/assets/1.jpg", "/assets/3.jpg"];
  const [background, setBackground] = useState();
  const [videoDisplay, setVideoDisplay] = useState(false);

  const { levels } = UserAuth();
  useEffect(() => {
    window.scrollTo(0, 0);
    toggler();
  }, []);

  function toggler() {
    setInterval(() => {
      return setBackground(
        backgrounds[Math.floor(Math.random() * backgrounds.length)]
      );
    }, 2000);
  }

  return (
    <div
      className={`w-full ${videoDisplay && "max-h-[80vh] overflow-hidden"} `}
    >
      <Socil />
      <Navbar target="main" />
      <div className={`w-full md:w-[80%] mx-auto my-5`}>
        <div className="md:w-[90%] md:mx-auto flex justify-between items-cneter flex-col-reverse lg:flex-row  ">
          <div className=" flex gap-2 items-end justify-center  relative px-2 w-full lg:w-[50%] lg:max-w-[50%] mt-5 md:mt-0">
            {levels
              ?.map((e) => {
                return (
                  <Link
                    to={`/class/${e._id}`}
                    className="children no-underline  hover:scale-110 duration-100 max-w-[220px] "
                    key={e._id}
                  >
                    <img src={e.photoURL} className={` block  `} alt="" />
                    <p className="text-black w-fit mx-auto mt-[20px] font-bold text-center text-[18px]">
                      {e.title}
                    </p>
                  </Link>
                );
              })
              .reverse()}
            <p className=" absolute w-[170px] md:w-[210px] left-[46%] top-[-4%] md:top-[-10%] bg-[#26ABBB] text-[10px] md:text-[16px]  flex items-center justify-center text-white px-3 md:px-4 py-2 md:py-3 rounded-t-[50px] rounded-br-[25px]">
              سجل دخولك حسب المرحلة
            </p>
          </div>
          <div className=" flex items-center lg:items-end justify-center flex-col">
            <h1 className=" text-[30px] xl:text-[40px] text-[#24343F] text-right hidden md:block ">
              انطلق مع بيان نحو التفوق
            </h1>
            <h1 className=" text-[30px] xl:text-[40px] text-[#24343F] text-center md:hidden px-2">
              انطلق مع بيان نحو التفوق
            </h1>
            <p className="lg:w-[500px] text-[20px] xl-text-[25px]  text-[#7f7f7f] hidden md:block md:text-right  ">
              تميز و حلق في سماء التفوق , بانضمامك لمنصة بيان التعليمية حيث
              الدوس التعليمية الشيقة والمذكرات والمراجعات الذهبية{" "}
            </p>
            <p className="lg:w-[500px] text-[20px] xl-text-[25px]  text-[#7f7f7f] text-center md:hidden px-2 ">
              تميز و حلق في سماء التفوق , بانضمامك لمنصة بيان التعليمية حيث
              الدوس التعليمية الشيقة والمذكرات والمراجعات الذهبية{" "}
            </p>
            {videoDisplay && (
              <div className="absolute top-0 left-0 w-full h-[100vh] bg-black/75 z-50 flex flex-col justify-start items-center px-3 py-3 gap-4 ">
                <button className="w-full text-right flex items-end justify-end text-white texte-[50px]">
                  {" "}
                  <AiOutlineFullscreenExit
                    size={40}
                    onClick={() => {
                      setVideoDisplay(false);
                    }}
                  />{" "}
                </button>
                <iframe
                  src="https://www.youtube.com/embed/EGwm0epYBIc"
                  title="intro video"
                  className="h-[80%] w-[90%] m-auto"
                ></iframe>
              </div>
            )}
            <button
              className="bg-[#26ABBB] mt-[35px] flex items-center justify-center gap-[20px] text-white px-4 py-3 rounded-[50px] no-underline"
              onClick={() => {
                setVideoDisplay(true);
              }}
            >
              {" "}
              تعرف علينا <AiFillPlayCircle size={25} />{" "}
            </button>
          </div>
        </div>
        <div className="rounded-lg w-full relative h-[373px] mt-10 ">
          <img
            src={background}
            className="absolute top-0 left-0 w-full h-full -z-10 object-cover"
            alt=""
          />
          <div className="absolute top-0 left-0 w-full h-full -z-0 bg-black/20"></div>
          <div className="absolute w-full h-full top-0 right-0 bg-black/20"></div>
          <div className="w-fit h-full p-4 bg-transparent mx-auto flex items-center justify-center flex-col text-white relative">
            <p className="font-bold">كل اللي تحتاجه للتفوق بمكان واحد</p>
            <button className="px-3 py-2 rounded-[50px] border-solid border-[1px] border-white">
              شاهد المزيد
            </button>
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
    </div>
  );
};

export default Main;
