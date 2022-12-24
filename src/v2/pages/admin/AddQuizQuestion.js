import React, { useEffect, useState } from "react";
import MainAdmin from "./MainAdmin";
import { addQuestion } from "./Operations";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../auth/context";
import api from "../../api/client";
import Cookies from "js-cookie";
const AddQuizQuestion = () => {
  const {
    GetLevels,
    seasons,
    levels,
    GetGrads,
    grads,
    GetSeasons,
    GetUnits,
    units,
    GetMaterial,
    material,
    GetLesson,
    lessons,
  } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    GetLevels();
  }, []);

  const [lessonId, setLessonId] = useState();
  const [message, setMessage] = useState("");

  const levelHandling = (e) => {
    GetGrads(e.target.value);
  };
  const gradHandling = (e) => {
    GetSeasons(e.target.value);
  };
  const seasonHandling = (e) => {
    GetMaterial(e.target.value);
  };
  const subjectHandling = (e) => {
    GetUnits(e.target.value);
  };
  const unitHandling = (e) => {
    GetLesson(e.target.value);
  };
  const lessonHandling = (e) => {
    setLessonId(e.target.value);
  };
  const handling = (e) => {
    e.preventDefault();
    api
      .get(`/lessons/${lessonId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.quiz.length > 0)
          navigate(`/admin/addquizquestion/${lessonId}`);
        else setMessage("لا يوجد اختبار لهذا الدرس");
      })
      .catch((error) => {
        Cookies.set("adminMessage", error);
      });
  };
  const content = (
    <div className="w-full flex items-start justify-end text-right text-[#26ABBB]">
      <form onSubmit={handling}>
        <label className="mt-[5px]">اختر المرحلة </label>
        <select
          required
          onChange={levelHandling}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر المرحلة{" "}
          </option>
          {levels?.map((e) => {
            return (
              <option value={e._id} key={e._id}>
                {e.title}
              </option>
            );
          })}
        </select>

        <label className="mt-[5px]">اختر الصف </label>
        <select
          required
          onChange={gradHandling}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر الصف{" "}
          </option>
          {grads?.map((e) => {
            return (
              <option value={e._id} key={e._id}>
                {e.number}
              </option>
            );
          })}
        </select>

        <label className="mt-[5px]">اختر الفصل </label>
        <select
          required
          onChange={seasonHandling}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر الفصل{" "}
          </option>
          {seasons?.map((e) => {
            return (
              <option value={e._id} key={e._id}>
                {e.number}
              </option>
            );
          })}
        </select>

        <label className="mt-[5px]">اختر المادة</label>
        <select
          required
          onChange={subjectHandling}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر المادة{" "}
          </option>
          {material?.map((e) => {
            return (
              <option value={e._id} key={e._id}>
                {e.title}
              </option>
            );
          })}
        </select>

        <label className="mt-[5px]">اختر الوحدة </label>
        <select
          required
          onChange={unitHandling}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر الوحدة{" "}
          </option>
          {units?.map((e) => {
            return (
              <option value={e._id} key={e._id}>
                {e.title}
              </option>
            );
          })}
        </select>

        <label className="mt-[5px]"> اختر الدرس </label>
        <select
          required
          onChange={lessonHandling}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر الدرس{" "}
          </option>
          {lessons?.map((e) => {
            return (
              <option value={e._id} key={e._id}>
                {e.title}
              </option>
            );
          })}
        </select>
        <p className="m-2 text-[20px] font-extrabold text-[#26ABBB] w-full text-right px-3 block">
          {message}
        </p>

        <button className="bg-[#26ABBB] rounded-3xl py-2 px-3 my-2 lg:px-4 border-[#24343F]  text-white text-base ">
          تنفيذ{" "}
        </button>
      </form>
    </div>
  );

  return (
    <div className="w-full ">
      <MainAdmin content={content} info="إضافة اسئلة للاختبارات" />
    </div>
  );
};

export default AddQuizQuestion;
