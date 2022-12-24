import React, { useEffect } from "react";
import { FaWhatsappSquare } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import Socil from "../components/Socil";
import { UserAuth } from "../context/AuthContext";

const Season = () => {
  const { seasons, GetSeasons } = UserAuth();
  const { classId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    GetSeasons(classId);
  }, []);
  return (
    <>
      <Socil />
      <Navbar target="main" />
      <div className="w-full md:w-[80%] mx-auto my-[80px]">
        <div className=" w-full flex justify-between items-start flex-col">
          <Heading main="الصف الثاني" sec=" الفصول الدراسية " />
          <div className="w-fit md:w-full mx-auto flex-col md:flex-row-reverse flex items-end justify-center mt-6 gap-[20px] md:gap-6">
            {seasons.map((e) => {
              return (
                <Link
                  to={`/material/classId/${classId}/seasonId/${e._id}`}
                  key={e._id}
                  className="bg-white group no-underline text-black rounded-lg  delay-100    hover:-rotate-3 shadow-lg flex flex-col justify-center items-center w-[276px] p-[25px] min-h-[180px]  "
                >
                  {/* <p className='p-0  m-0 text-[18px] xl:text-[20px] text-center'>الفصل الاول </p> */}
                  <img
                    src={e.photoURL}
                    alt=""
                    className="w-[180px] object-cover block "
                  />
                </Link>
              );
            })}
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

export default Season;
