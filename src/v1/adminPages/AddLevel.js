import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import MainAdmin from "./MainAdmin";
import { addLevel } from "./Operations";
const AddLevel = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState();
  const [disable, setDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const fileHandling = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImgSrc(reader.result);
    };
    setFile(e.target.files[0]);
  };

  const handle = (e) => {
    e.preventDefault();
    setDisabled(true);
    addLevel(name, file, () => {
      setDisabled(false);
      document.getElementById("my_form").reset();
      setFile();
      setName("");
      setImgSrc("");
    });
  };

  useEffect(() => {
    Cookies.set("adminMessage", "");
  }, [Cookies.get("adminMessage")]);

  const content = (
    <div className="w-full flex items-start justify-end text-right text-[#26ABBB]">
      <form onSubmit={handle} id="my_form">
        <label className="mt-4">اسم المرحلة </label>
        <input
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="name"
          className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
        />

        <label className="mt-4">(PNG) صورة المرحلة </label>
        <div className="w-full text-right flex justify-end items-center py-3">
          <input
            required
            type="file"
            onChange={fileHandling}
            className="w-[97px] "
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
      <MainAdmin content={content} info="اضافة مرحلة  جديدة " />
    </div>
  );
};

export default AddLevel;
