import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AiOutlineArrowRight } from "react-icons/ai";
import Socil from "../components/Socil";
import { UserAuth } from "../context/AuthContext";
import { FaWhatsappSquare } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Lesson = () => {
  const { units, GetUnits, GetLesson, lessons, setUnits, setLessons } =
    UserAuth();
  const { materialId } = useParams();
  const [alternativeText, setAlternativeText] = useState(
    " اختر الوحدة لتشاهد الدروس "
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setUnits([]);
    setLessons([]);
    GetUnits(materialId);
  }, []);
  function handle(e) {
    e.preventDefault();
    setAlternativeText("لم يتم اضافة دروس لهذه الوحدة حاليا ");
    setLessons([]);
    GetLesson(e.target.value);
  }
  const notify = () => {
    toast.warn("اشترك للمتابعة", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <Socil />
      <Navbar target="main" />
      <div className="w-full md:w-[80%] mx-auto my-[80px]">
        <div className=" w-full flex justify-between items-start flex-col   ">
          <div className="w-full flex gap-[50px] flex-col-reverse lg:flex-row items-start justify-center mt-5">
            <div className="w-[20%] mx-auto hidden md:block">
              <img src="/assets/ثانوي.png" alt="" className="object-cover " />
            </div>
            <div className="w-full lg:w-[40%] text-right md:text-center">
              <form onChange={handle}>
                <select className="w-full h-[80px]  p-4 pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] ">
                  <option value="select" defaultValue>
                    اخنر الوحدة{" "}
                  </option>
                  {units.map((e) => {
                    return (
                      <option value={e._id} key={e._id}>
                        {e.title}
                      </option>
                    );
                  })}
                </select>
              </form>

              <div className="w-full p-3 rounded-lg mt-4">
                {lessons.length ? (
                  lessons?.map((e) => {
                    return (
                      <div key={e._id}>
                        {e.video[0]?.url ? (
                          <Link
                            to={`/lesson/${materialId}/unitId/${e.unitId}/lessonDetails/${e._id}`}
                            onClick={() => {
                              localStorage.setItem(
                                "lessonData",
                                JSON.stringify(e)
                              );
                            }}
                            className="w-full flex justify-between items-cente px-3 p-4 rounded-lg my-2 hover:scale-105 duration-500 shadow-lg no-underline cursor-pointer"
                          >
                            <div className="flex gap-4 items-center justify-center">
                              <AiOutlineArrowRight
                                size={20}
                                className="text-[#26ABBB]"
                              />
                            </div>
                            <p className="text-[14px] text-right md:text-[22px] pb-0 mb-0 text-black">
                              {e.title}{" "}
                            </p>
                          </Link>
                        ) : (
                          <button
                            className="w-full flex justify-between items-cente px-3 p-4 rounded-lg my-2 hover:scale-105 duration-500 shadow-lg no-underline "
                            onClick={notify}
                          >
                            <div className="flex gap-4 items-center justify-center">
                              <AiOutlineArrowRight
                                size={20}
                                className="text-[#26ABBB]"
                              />
                            </div>
                            <p className="text-[14px] text-right md:text-[22px] pb-0 mb-0 text-black">
                              {e.title}{" "}
                            </p>
                          </button>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <>
                    <h2>{alternativeText}</h2>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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

export default Lesson;

//     const handelLessonClick = (lesson) => {
//         localStorage.setItem('lessonData', JSON.stringify(lesson));
//         lesson.video[0].url && navtigate(`/lesson/${materialId}/unitId/${lesson.unitId}/lessonDetails/${lesson._id}`);
//     };

//                             <div className='w-full p-3 rounded-lg mt-4'>
//                                 {lessons.length ?
//                                     lessons.map(e => {
//                                         return (
//                                             <div key={e._id}>
//                                                 <div onClick={() => handelLessonClick(e)} className='w-full flex justify-between items-cente px-3 p-4 rounded-lg my-2 hover:scale-105 duration-500 shadow-lg no-underline cursor-pointer'  >
//                                                     <div className='flex gap-4 items-center justify-center'>
//                                                         <AiOutlineArrowRight size={20} className='text-[#26ABBB]' />
//                                                     </div>
//                                                     <p className='text-[14px] text-right md:text-[22px] pb-0 mb-0 text-black'>{e.title}   </p>
//                                                 </div>
//                                             </div>
//                                         )
//                                     }) :
//                                     <>
//                                         <h2>{alternativeText}</h2>
//                                     </>
//                                 }
//                             </div>
