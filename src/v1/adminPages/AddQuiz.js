import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import MainAdmin from "./MainAdmin";
import { addQuiz } from "./Operations";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const AddQuiz = () => {
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
    packages,
    GetPackage,
    GetLesson,
    lessons,
  } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    GetLevels();
  }, []);
  useEffect(() => {
    Cookies.set("adminMessage", "");
  }, [Cookies.get("adminMessage")]);

  const [lessonId, setLessonId] = useState();
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [disable, setDisabled] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const videoHandling = (e) => {
    setFile(e.target.files[0]);
  };

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
    setDisabled(true);
    e.preventDefault();
    addQuiz(lessonId, title, () => {
      setDisabled(false);
      document.getElementById("my_form").reset();
    });
  };

  const content = (
    <div className="w-full flex items-start justify-end text-right text-[#26ABBB]">
      <form onSubmit={handling} id="my_form">
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

        <label className="mt-[5px]">اختر الفصل</label>
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
        <label className="mt-[2px]"> عنوان </label>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          id="name"
          className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
        />

        <p className="m-2 text-[20px] font-extrabold text-[#26ABBB] w-full text-right px-3 block">
          {Cookies.get("adminMessage")}
        </p>

        <button
          className="bg-[#26ABBB] rounded-3xl py-2 px-3 my-4 lg:px-4 border-[#24343F]  text-white text-base "
          disabled={disable}
        >
          تنفيذ{" "}
        </button>
      </form>
    </div>
  );

  return (
    <div className="w-full ">
      <MainAdmin content={content} info="إضافة اختبار" />
    </div>
  );
};

export default AddQuiz;
