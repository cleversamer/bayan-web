import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import MainAdmin from "./MainAdmin";
import { addSubjects } from "./Operations";

const AddSubjects = () => {
  const { GetLevels, levels, GetGrads, grads, GetSeasons, seasons } =
    UserAuth();
  const [subjectName, setSubjectName] = useState("");
  const [seasonId, setSesonId] = useState("");
  const [file, setFile] = useState();
  const [video, setVideo] = useState();
  const [disable, setDisabled] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const fileHandle = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImgSrc(reader.result);
    };
    setFile(e.target.files[0]);
  };

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
    setSesonId(e.target.value);
  };

  const handle = (e) => {
    e.preventDefault();
    setDisabled(true);

    // for video deploy
    // addSubjects(seasonId, subjectName, video, file,,'video')

    // for video url
    addSubjects(seasonId, subjectName, video, file, "url", () => {
      setDisabled(false);
      setSubjectName("");
      setSesonId("");
      setFile("");
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
      <form onSubmit={handle}>
        <label className="mt-2">اختر المرحلة </label>
        <select
          required
          onChange={levelHandling}
          className="w-full h-[40px] text-black  pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
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
        <label className="mt-2">اختر الصف </label>
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

        <label className="mt-2">اختر الفصل</label>
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

        <label className="mt-2"> اسم الماة </label>
        <input
          required
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        />

        {/* <label className='mt-2'> فيديو المادة </label>
                <input required type='text' onChange={(e) => setVideo(e.target.value)} className='w-full h-[40px]  p-4 pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] ' /> */}
        <div className="w-full text-right flex justify-end items-end mt-2 flex-col">
          <label className="">فيديو المادة </label>
          {/* <input required type='file' onChange={videoHandling} className='w-[97px] ml-5' /> */}
          <input
            required
            type="url"
            onChange={videoHandling}
            value={video}
            className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
          />
        </div>

        <div className="w-full text-right flex justify-end items-center mt-2">
          <label className="">(PNG) صورة المادة </label>
          <input
            required
            type="file"
            onChange={fileHandle}
            className="w-[97px] ml-5"
          />
        </div>
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
      <MainAdmin content={content} info="اضافة مادة" />
    </div>
  );
};

export default AddSubjects;
