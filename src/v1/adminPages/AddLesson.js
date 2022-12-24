import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import MainAdmin from "./MainAdmin";
import { addLesson } from "./Operations";

const AddLesson = () => {
  const {
    GetLevels,
    levels,
    GetGrads,
    grads,
    GetUnits,
    units,
    seasons,
    GetMaterial,
    material,
    GetSeasons,
  } = UserAuth();
  const [name, setName] = useState();
  const [unitId, setUnitId] = useState();
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
    GetUnits(e.target.value);
  };
  const unitHandling = (e) => {
    setUnitId(e.target.value);
  };
  const handling = (e) => {
    e.preventDefault();
    console.log(unitId, name);
    addLesson(unitId, name, () => {
      setDisabled(false);
      setName("");
      setUnitId("");
      setImgSrc("");
    });
  };

  useEffect(() => {
    Cookies.set("adminMessage", "");
  }, [Cookies.get("adminMessage")]);

  useEffect(() => {
    GetLevels();
  }, []);
  const content = (
    <div className="w-full flex items-start justify-end text-right text-[#26ABBB]">
      <form onSubmit={handling}>
        {/* onChange={} */}

        <label className="mt-2">اختر المرحلة </label>
        <select
          required
          onChange={levelHandling}
          className="w-full h-[40px] text-black  pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اختر المرحلة{" "}
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
            اختر الصف{" "}
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
            اختر الفصل{" "}
          </option>
          {seasons?.map((e) => {
            return (
              <option value={e._id} key={e._id}>
                {e.number}
              </option>
            );
          })}
        </select>

        <label className="mt-2">اختر المادة</label>
        <select
          required
          onChange={subjectHandling}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اختر المادة{" "}
          </option>
          {material?.map((e) => {
            return (
              <option value={e._id} key={e._id}>
                {e.title}
              </option>
            );
          })}
        </select>

        <label className="mt-2">اختر الوحدة </label>
        <select
          required
          onChange={unitHandling}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اختر المادة{" "}
          </option>
          {units?.map((e) => {
            return (
              <option value={e._id} key={e._id}>
                {e.title}
              </option>
            );
          })}
        </select>

        <label className="mt-2"> اسم الدرس </label>
        <input
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="name"
          className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
        />

        <div className="flex items-end justify-end  p-4">
          {imgSrc && <img src={imgSrc} alt="" className="w-[100px] block " />}
        </div>
        <p className="m-2 text-[20px] font-extrabold text-[#26ABBB] w-full text-right px-3 block animate-bounce">
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
      <MainAdmin content={content} info="اضافة درس جديد " />
    </div>
  );
};

export default AddLesson;
