import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import MainAdmin from "./MainAdmin";
import { addLesson, addVideo } from "./Operations";

const AddVideo = () => {
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

  const [lessonId, setLessonId] = useState();
  const [video, setVideo] = useState();
  const [des, setDes] = useState();
  const [title, setTitle] = useState();
  const [disable, setDisabled] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const videoHandling = (e) => {
    // setVideo(e.target.files[0])
    setVideo(e.target.value);
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
    e.preventDefault();
    setDisabled(true);
    addVideo(lessonId, title, video, des, () => {
      setDisabled(false);
      setLessonId("");
      setDes("");
      setTitle("");
      setVideo("");
      setImgSrc("");
    });
  };

  useEffect(() => {
    GetLevels();
  }, []);

  useEffect(() => {
    Cookies.set("adminMessage", "");
  }, [Cookies.get("adminMessage")]);

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
            اخنر المادة{" "}
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
        <div className="flex justify-center items-start">
          <div className="w-[50%]">
            <label className="mt-[2px]"> عنوان الفيديو </label>
            <input
              required
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              id="name"
              className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
            />
          </div>
          <div className="w-[50%]">
            <label className="mt-[2px]"> وصف الفيديو </label>
            <input
              required
              type="text"
              onChange={(e) => setDes(e.target.value)}
              value={des}
              id="name"
              className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
            />
          </div>
        </div>
        <div className="w-full text-right flex justify-end items-center mt-2">
          <label className="">فيديو الدرس </label>
          <input
            required
            type="url"
            onChange={videoHandling}
            value={video}
            className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
          />
        </div>
        {/* <div className='w-full text-right flex justify-end items-center mt-2'>
                    <label className=''>فيديو الدرس </label>
                    <input required type='file' onChange={videoHandling} className='w-[97px] ml-5' />
                </div> */}
        <div className="flex items-end justify-end  p-4">
          {imgSrc && <img src={imgSrc} alt="" className="w-[100px] block " />}
        </div>
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
      <MainAdmin content={content} info="إضافة فيديو إلى درس  " />
    </div>
  );
};

export default AddVideo;
