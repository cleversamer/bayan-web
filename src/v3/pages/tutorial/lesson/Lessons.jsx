/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import unitsApi from "v3/api/tutorial/units";
import lessonsApi from "v3/api/tutorial/lessons";
import toast from "v3/services/toast";
import useAuth from "v3/auth/useAuth";

import WhatsApp from "v3/components/WhatsApp";
import Footer from "v3/components/Footer";
import Navbar from "v3/components/Navbar";
import Social from "v3/components/Social";

import { AiOutlineArrowRight } from "react-icons/ai";

const Lessons = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subjectId } = useParams();
  const [selectedUnit, setSelectedUnit] = useState("");
  const [content, setContent] = useState({
    subjectVideoURL: "",
    units: [],
    lessons: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    unitsApi
      .getSubjectUnits(subjectId)
      .then((res) => {
        const { units, videoURL } = res.data;
        setContent({ ...content, units, subjectVideoURL: videoURL });
      })
      .catch((err) => {
        toast.showWarning(err?.response?.data?.message?.ar || err.message);
      });
  }, [subjectId]);

  useEffect(() => {
    if (!selectedUnit || selectedUnit === "select") {
      return;
    }

    lessonsApi
      .getUnitLessons(selectedUnit)
      .then((res) => {
        setContent({ ...content, lessons: res.data });
      })
      .catch((err) => {
        toast.showWarning("لا يوجد دروس مسجلة لهذه الوحدة بعد");

        setContent({
          ...content,
          lessons: [],
        });
      });
  }, [selectedUnit]);

  const handleUnitSelect = (e) => {
    const unitId = e.target.value;
    if (unitId) {
      setSelectedUnit(unitId);
    }
  };

  const handleLessonClick = (lessonId) => () => {
    if (user) {
      navigate(`/lesson/${lessonId}`);
    } else {
      toast.showWarning("يجب عليك تسجيل الدخول لتتمكن من رؤية محتوى الدروس");
    }
  };

  return (
    <>
      <Social />

      <Navbar target="main" />
      <div className="w-full md:w-[80%] mx-auto my-[40px]">
        <div className=" w-full flex justify-between items-start flex-col   ">
          {content.subjectVideoURL && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "70%",
                margin: "0 auto",
              }}
            >
              <p className="text-center text-black text-[28px]">
                فيديو تعريفي عن المادة
              </p>

              <video
                src={"http://191.101.229.249:4000" + content.subjectVideoURL}
                className="rounded-lg w-full"
                controls
              ></video>
            </div>
          )}

          <div className="w-full flex gap-[50px] flex-col-reverse lg:flex-row items-start justify-center mt-5">
            <div className="w-[20%] mx-auto md:block">
              <img src="/assets/ابتدائي.png" alt="" className="object-cover " />
            </div>

            <div className="w-full lg:w-[40%] text-right md:text-center">
              <form onChange={handleUnitSelect}>
                <select className="w-full h-[80px]  p-4 pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] ">
                  <option value="select" defaultValue>
                    اخنر الوحدة{" "}
                  </option>

                  {content.units.map((unit) => (
                    <option value={unit._id} key={unit._id}>
                      {unit.title}
                    </option>
                  ))}
                </select>
              </form>

              <div className="w-full p-3 rounded-lg mt-4">
                {content.lessons.map((lesson) => (
                  <div
                    key={lesson._id}
                    onClick={handleLessonClick(lesson._id)}
                    className="w-full flex justify-between items-cente px-3 p-4 rounded-lg my-2 hover:scale-105 duration-500 shadow-lg no-underline cursor-pointer"
                  >
                    <div className="flex gap-4 items-center justify-center">
                      <AiOutlineArrowRight
                        size={20}
                        className="text-[#26ABBB]"
                      />
                    </div>

                    <p className="text-[14px] text-right md:text-[22px] pb-0 mb-0 text-black">
                      {lesson.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <WhatsApp />
    </>
  );
};

export default Lessons;
