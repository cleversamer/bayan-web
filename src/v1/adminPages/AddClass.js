import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import MainAdmin from "./MainAdmin";
import { addClass } from "./Operations";

const AddClass = () => {
  const { GetLevels, levels } = UserAuth();
  const [levelId, setLevelId] = useState("");
  const [gradNumber, setGradNumber] = useState("");
  const [file, setFile] = useState();
  const [disable, setDisabled] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const fileHandling = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImgSrc(reader.result);
    };
    setFile(e.target.files[0]);
  };
  const levelHandling = (e) => {
    setLevelId(e.target.value);
  };

  const handle = (e) => {
    e.preventDefault();
    setDisabled(true);
    addClass(levelId, gradNumber, file, () => {
      setDisabled(false);
      setLevelId("");
      setGradNumber("");
      setFile();
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
        <label className="mt-4">اختر المرحلة </label>
        <select
          required
          value={levelId}
          onChange={levelHandling}
          className="w-full h-[40px]  pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] text-[#26ABBB] "
        >
          <option value="select" defaultValue className="text-[#26ABBB]">
            اخنر المرحلة{" "}
          </option>
          {levels?.map((e) => {
            return (
              <option value={e._id} key={e._id} className="text-[#26ABBB]">
                {" "}
                {e.title}
              </option>
            );
          })}
        </select>

        <label className="mt-4">رقم الصف </label>
        <input
          required
          type="number"
          value={gradNumber}
          onChange={(e) => setGradNumber(e.target.value)}
          className="w-full h-[40px]  p-4 pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        />

        <label className="mt-4">(PNG) صورة الصف </label>
        <div className="w-full text-right flex justify-end items-center py-3">
          <input
            required
            type="file"
            onChange={fileHandling}
            className="w-[97px]"
          />
        </div>
        <div className="flex items-end justify-end  p-4">
          {imgSrc && <img src={imgSrc} alt="" className="w-[100px] block " />}
        </div>
        <p className="m-2 text-[20px] font-extrabold text-[#26ABBB] w-full text-right px-3 block animate-bounce ">
          {Cookies.get("adminMessage")}
        </p>

        <button
          className={`bg-[#26ABBB]  text-white rounded-3xl py-2 px-3 my-4 lg:px-4 border-[#24343F] text-base `}
          disabled={disable}
        >
          تنفيذ{" "}
        </button>
      </form>
    </div>
  );

  return (
    <div className="w-full ">
      <MainAdmin content={content} info="اضافة صف جديد " />
    </div>
  );
};

export default AddClass;
