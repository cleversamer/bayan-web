import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import Socil from "../components/Socil";
import { UserAuth } from "../context/AuthContext";
import { FaWhatsappSquare } from "react-icons/fa";

const Material = () => {
  const { seasonId, classId } = useParams();
  const { material, GetMaterial, packages, GetPackage } = UserAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    GetMaterial(seasonId);
    GetPackage(classId);
  }, []);

  return (
    <>
      <Socil />
      <Navbar target="main" />
      <div className="w-full md:w-[80%] mx-auto my-[80px]">
        <div className=" w-full flex justify-between items-start flex-col   ">
          <Heading main="المرحلة الابتدائية" sec="المرحلة الابتدائية" />
          <div className=" w-fit mx-auto md:w-full flex flex-wrap items-center justify-center my-[60px] gap-[60px] px-3">
            {material.map((el) => {
              return (
                <Link
                  to={`/lesson/${el._id}`}
                  key={el._id}
                  className="bg-white no-underline delay-100    hover:-rotate-3 text-black rounded-3xl shadow-lg flex flex-col justify-center items-center w-[276px] p-[25px] min-h-[180px] "
                >
                  <p className="p-0  m-0 text-[15px] xl:text-[17px] text-center text-[#8D8D8D]">
                    {el.title}
                  </p>
                  <p className="p-0  m-0 text-[18px] xl:text-[20px] text-center">
                    {el.materialNameInArabic}
                  </p>
                  <img
                    src={el.photoURL}
                    alt=""
                    className="w-[180px] object-cover block"
                  />
                </Link>
              );
            })}
          </div>
          <div className="mt-[140px] w-full">
            <p className="text-right w-full text-[36px] px-3">
              الباقات الدراسية
            </p>
            <div className="w-fit mx-auto md:w-full flex flex-row-reverse flex-wrap items-center justify-center my-[60px] gap-[60px] px-3">
              {packages.map((el) => {
                return (
                  <Link
                    to={`/classId/${classId}/season/${seasonId}/package/${el._id}/packageCapacity/${el.numOfSubjects}`}
                    key={el._id}
                    className="bg-white no-underline text-black rounded-3xl  shadow-lg  flex flex-col justify-center items-center w-[300px] p-[15px] min-h-[180px] "
                  >
                    <div className="w-full flex items-start justify-start">
                      <img
                        src="/package.png"
                        alt=""
                        className="w-[200px] object-cover block"
                      />
                    </div>
                    <div className="w-full flex flex-col items-end justify-center">
                      <p className="p-0  m-0 text-[15px] xl:text-[17px] text-center text-[#8D8D8D]">
                        باقة {el.numOfSubjects} مواد
                      </p>
                      <p className="p-0  m-0 text-[18px] xl:text-[20px] text-center">
                        {" "}
                        {el.price} ${" "}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
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

export default Material;
