import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import MainAdmin from "./MainAdmin";
import { addUnit } from "./Operations";
const AddUnits = () => {
  const {
    GetLevels,
    levels,
    GetGrads,
    grads,
    GetSeasons,
    seasons,
    GetMaterial,
    material,
  } = UserAuth();
  const [unitName, setUnitName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [disable, setDisabled] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

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
    setSubjectId(e.target.value);
  };
  const handle = (e) => {
    e.preventDefault();
    setDisabled(true);

    addUnit(subjectId, unitName, () => {
      setDisabled(false);
      setUnitName("");
      setSubjectId("");
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
        {/* onChange={} */}
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
        <label className="mt-4">اختر الصف </label>
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

        <label className="mt-4">اختر الفصل</label>
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

        <label className="mt-4">اختر المادة</label>
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

        <label className="mt-4">اسم الوحدة</label>
        <input
          required
          onChange={(e) => setUnitName(e.target.value)}
          value={unitName}
          type="text"
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        />

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
      <MainAdmin content={content} info="اضافة  وحدة  " />
    </div>
  );
};

export default AddUnits;
