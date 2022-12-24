import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import MainAdmin from "./MainAdmin";
import { addSeason } from "./Operations";
const AddSeason = () => {
  const { GetLevels, levels, GetGrads, grads } = UserAuth();
  const [gradId, setGradId] = useState("");
  const [seasonNumber, setSesonNumber] = useState("");
  const [file, setFile] = useState();
  const [disable, setDisabled] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  // const [grads, setGrads] = useState();

  const fileHandle = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImgSrc(reader.result);
    };
    setFile(e.target.files[0]);
  };

  const levelHandling = (e) => {
    GetGrads(e.target.value);
  };

  const gradHandling = (e) => {
    setGradId(e.target.value);
  };

  const handle = (e) => {
    e.preventDefault();
    setDisabled(true);
    addSeason(gradId, seasonNumber, file, () => {
      document.getElementById("my_form").reset();
      setDisabled(false);
      setGradId("");
      setSesonNumber("");
      setFile();
      setImgSrc();
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
      <form onSubmit={handle} id="my_form">
        <label className="mt-4">اختر المرحلة </label>
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

        <label className="mt-4">اختر الصف</label>
        <select
          required
          onChange={gradHandling}
          value={gradId}
          className=" w-full h-[40px] text-black  pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر الصف{" "}
          </option>
          {grads?.map((e) => {
            return (
              <option className="text-black" value={e._id} key={e._id}>
                {e.number}{" "}
              </option>
            );
          })}
        </select>

        <label className="mt-4">رقم الفصل </label>
        <input
          required
          type="number"
          value={seasonNumber}
          onChange={(e) => setSesonNumber(e.target.value)}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        />

        <label className="mt-4">(PNG) صورة الفصل </label>
        <div className="w-full text-right flex justify-end items-center py-3">
          <input
            required
            type="file"
            onChange={fileHandle}
            className="w-[97px]"
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
      <MainAdmin content={content} info="اضافة فصل جديد " />
    </div>
  );
};

export default AddSeason;
