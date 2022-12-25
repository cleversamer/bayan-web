/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import lessonsApi from "v3/api/tutorial/lessons";
import toast from "v3/services/toast";

import WhatsApp from "v3/components/WhatsApp";
import Footer from "v3/components/Footer";
import Navbar from "v3/components/Navbar";
import Social from "v3/components/Social";

import { AiOutlineDownload } from "react-icons/ai";

const Video = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState({ data: null, error: "" });

  useEffect(() => {
    window.scrollTo({ top: 300, behavior: "smooth" });

    lessonsApi
      .getLessonById(lessonId)
      .then((res) => {
        const lesson = res.data;
        setLesson({ ...lesson, data: lesson });

        if (!lesson.video) {
          toast.showWarning("لم يتم إضافة فيديو إلى هذا الدرس بعد");
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message?.ar) {
          toast.showWarning(err?.response?.data?.message?.ar);
        } else {
          toast.showError(err.message);
        }
      });
  }, [lessonId]);

  return (
    <>
      <Social />

      <Navbar target="main" />
      <div className="w-full md:w-[80%] mx-auto my-[80px]">
        <div className=" w-full flex justify-between items-start flex-col   ">
          <div className="w-full text-right mt-5">
            <p className="text-right text-black text-[30px]">
              {lesson?.data?.title}
            </p>
          </div>

          <div className="w-full flex gap-[50px] flex-col-reverse lg:flex-row items-start justify-center mt-5">
            <div className="w-[100%] mx-auto lg:w-[100%]">
              <video
                src={lesson?.data?.video[0]?.url}
                className="w-full rounded-lg"
                controls
              ></video>

              <div className="w-full flex flex-col gap-8 items-end justify-center ">
                <div className="flex gap-4">
                  <p className="px-5 py-3 text-white bg-[#26ABBB] no-underline rounded-3xl mt-[30px] mb-0 ">
                    تفاصيل عن الدرس
                  </p>
                </div>

                <p className="w-[90%] flex items-center justify-end text-right ">
                  {lesson?.data?.video[0]?.description}
                </p>
              </div>

              {lesson?.data?.document && lesson?.data?.document[0] && (
                <div className="w-full flex  flex-row-reverse   gap-8 items-center justify-start  ">
                  <p className="px-5 py-3 text-white bg-[#26ABBB] no-underline rounded-3xl mt-[30px] m-0 ">
                    ملحقات الدرس
                  </p>

                  <a
                    className="text-white bg-gray-600 rounded-[25px] px-4 py-3 no-underline w-fit flex items-center justify-between"
                    target="_blank"
                    href={lesson?.data?.document[0].fileUrl}
                  >
                    <AiOutlineDownload className="mx-2" />{" "}
                    {lesson?.data?.document[0]?.title}
                  </a>
                </div>
              )}

              {lesson?.data?.quiz && lesson?.data?.quiz[0] && (
                <div className="w-full flex  flex-row-reverse   gap-8 items-center justify-start mt-5  ">
                  <p className="px-5 py-3 text-white bg-[#26ABBB] no-underline rounded-3xl mt-[30px] m-0 ">
                    {" "}
                    الكويز
                  </p>
                  <Link
                    to={`/quiz/${lesson?.data?.quiz[0]?._id}`}
                    className="text-white bg-gray-600 rounded-[25px] px-4 py-3 no-underline"
                  >
                    {lesson?.data?.quiz[0]?.title}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <WhatsApp />
    </>
  );
};

export default Video;
