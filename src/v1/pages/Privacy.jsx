import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Socil from "../components/Socil";
import { FaWhatsappSquare } from "react-icons/fa";

const Info = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Socil />
      <Navbar target="main" />
      <div className="w-full md:w-[80%] mx-auto my-[60px] md:my-[80px]">
        <div className=" w-full flex justify-between items-start flex-col   ">
          <div className=" w-fit mx-auto md:w-full flex flex-wrap flex-col-reverse md:flex-row items-center md:items-center justify-center md:justify-end gap-3">
            <div className="">
              <p className="bg-[#26ABBB] text-[18px] md:text-[23px] font-bold  flex items-center justify-center text-white px-[60px] py-3 md:py-4 rounded-t-[50px] rounded-bl-[25px]">
                الخصوصية
              </p>
            </div>
            <img
              src="/assets/ابتدائي.png"
              alt=""
              className="object-cover w-[100px]"
            />
          </div>
          <p className="px-[30px] py-[15px] bg-[#a6a2a21f] text-black text-[19px] text-right mt-[30px] mx-auto w-[88%] rounded-lg leading-[50px]">
            {props.content}
          </p>
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

export default Info;
