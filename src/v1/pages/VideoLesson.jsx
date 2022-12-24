import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Socil from "../components/Socil";
import { FaWhatsappSquare } from "react-icons/fa";

const VideoLesson = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Socil />
      <Navbar target="main" />
      <div className="w-full md:w-[80%] mx-auto my-[80px]">
        <div className=" w-full flex justify-between items-start flex-col   ">
          {/* <Heading main='المرحلة الابتدائية' sec='اللغة العربية' /> */}
          <div className="w-full text-right mt-5">
            {/* <p className='text-right text-black text-[20px]'>الدرس الأول</p> */}
            <p className="text-right text-black text-[30px]">
              {JSON.parse(localStorage.getItem("lessonData")).title}
            </p>
          </div>
          <div className="w-full flex gap-[50px] flex-col-reverse lg:flex-row items-start justify-center mt-5">
            <div className="w-[100%] mx-auto lg:w-[100%]">
              <video
                src={
                  JSON.parse(localStorage.getItem("lessonData")).video[0].url
                }
                className="w-full rounded-lg"
                controls
              ></video>
              <div className="w-full flex flex-col gap-8 items-end justify-center ">
                <div className="flex gap-4">
                  {/* <Link className='px-5 py-3 text-black bg-white no-underline rounded-3xl border-black border-solid border-2 mt-[30px]' to=''>اطرح سؤال</Link> */}
                  <p className="px-5 py-3 text-white bg-[#26ABBB] no-underline rounded-3xl mt-[30px] mb-0 ">
                    {" "}
                    تفاصيل عن الدرس
                  </p>
                </div>
                <p className="w-[90%] flex items-center justify-end text-right ">
                  {JSON.parse(localStorage.getItem("lessonData")).video[0]
                    .description.length > 0 &&
                    JSON.parse(localStorage.getItem("lessonData")).video[0]
                      .description}{" "}
                </p>
              </div>
              {JSON.parse(localStorage.getItem("lessonData")).document[0] && (
                <div className="w-full flex  flex-row-reverse   gap-8 items-center justify-start  ">
                  <p className="px-5 py-3 text-white bg-[#26ABBB] no-underline rounded-3xl mt-[30px] m-0 ">
                    {" "}
                    ملحقات الدرس
                  </p>
                  <a
                    className="text-white bg-gray-600 rounded-[25px] px-4 py-3 no-underline w-fit flex items-center justify-between"
                    target="_blank"
                    href={
                      JSON.parse(localStorage.getItem("lessonData")).document[0]
                        .fileUrl
                    }
                  >
                    <AiOutlineDownload className="mx-2" />{" "}
                    {
                      JSON.parse(localStorage.getItem("lessonData")).document[0]
                        .title
                    }
                  </a>
                </div>
              )}
              {JSON.parse(localStorage.getItem("lessonData")).quiz[0] && (
                <div className="w-full flex  flex-row-reverse   gap-8 items-center justify-start mt-5  ">
                  <p className="px-5 py-3 text-white bg-[#26ABBB] no-underline rounded-3xl mt-[30px] m-0 ">
                    {" "}
                    الكويز
                  </p>
                  <Link
                    to={`/quiz/${
                      JSON.parse(localStorage.getItem("lessonData")).quiz[0]._id
                    }`}
                    className="text-white bg-gray-600 rounded-[25px] px-4 py-3 no-underline"
                  >
                    {/* {baseUrl + JSON.parse(localStorage.getItem('lessonData')).quiz[0].fileUrl} */}
                    {
                      JSON.parse(localStorage.getItem("lessonData")).quiz[0]
                        .title
                    }
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <a
        href="https://wa.me/+970567682999"
        target="_blank"
        className="fixed bottom-0 right-0  md:right-10 hover:text-[#26ABBB] text-[#26ABBB] "
      >
        <FaWhatsappSquare size={80} />
      </a>
    </>
  );
};

export default VideoLesson;
