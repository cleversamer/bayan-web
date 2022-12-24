/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import levelsApi from "v2/api/tutorial/levels";
import gradesApi from "v2/api/tutorial/grades";
import toast from "v2/services/toast";

import MainAdmin from "./MainAdmin";
import PopupMessage from "v2/components/PopupMessage";

const AddGrade = () => {
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState("");
  const [formData, setFormData] = useState({
    levels: [],
    levelId: "",
    number: "",
    photo: null,
    submitting: false,
  });

  useEffect(() => {
    levelsApi
      .getAllLevels()
      .then((res) => {
        setFormData({ ...formData, levels: res.data });
      })
      .catch((err) => {
        //
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, submitting: true });

    const { levelId, number, photo } = formData;
    gradesApi
      .createGrade(levelId, number, photo)
      .then((res) => {
        toast.showSuccess("تمت العملية بنجاح");
      })
      .catch((err) => {
        toast.showWarning(err?.response?.data?.message?.ar || err.message);
      })
      .finally(() => {
        setFormData({
          levels: formData.levels,
          levelId: "",
          number: "",
          photo: null,
          submitting: false,
        });

        setSelectedPhotoUrl("");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  };

  const handleChange = (key) => (e) => {
    let value = e.target.value;

    if (e.target.files) {
      value = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = () => {
        setSelectedPhotoUrl(reader.result);
      };
    }

    setFormData({ ...formData, [key]: value });
  };

  const content = (
    <div className="w-full flex items-start justify-end text-right text-[#26ABBB]">
      {formData.submitting && <PopupMessage message="جاري إضافة الصف" />}

      <form onSubmit={handleSubmit}>
        <label className="mt-4">إختر المرحلة</label>

        <select
          required
          value={formData.levelId}
          onChange={handleChange("levelId")}
          className="w-full h-[40px]  pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] text-[#26ABBB] "
        >
          <option value="select" defaultValue className="text-[#26ABBB]">
            إختر المرحلة
          </option>

          {formData.levels.map((level) => (
            <option
              key={level._id}
              value={level._id}
              className="text-[#26ABBB]"
            >
              {level.title}
            </option>
          ))}
        </select>

        <label className="mt-4">رقم الصف</label>
        <input
          required
          type="number"
          value={formData.number}
          onChange={handleChange("number")}
          className="w-full h-[40px]  p-4 pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        />

        <label className="mt-4">صورة الصف</label>

        <div className="w-full text-right flex justify-end align-center items-center py-3">
          <p style={{ margin: "auto 0", marginRight: "5px" }}>
            {formData.photo?.name}
          </p>

          <input
            required
            type="file"
            onChange={handleChange("photo")}
            accept="image/png image/jpg image/jpeg"
            className="w-[97px] "
          />
        </div>

        <div className="flex items-end justify-end  p-4">
          {selectedPhotoUrl && (
            <img src={selectedPhotoUrl} alt="" className="w-[100px] block " />
          )}
        </div>

        <button
          className={`bg-[#26ABBB]  text-white rounded-3xl py-2 px-3 my-4 lg:px-4 border-[#24343F] text-base `}
          disabled={formData.submitting}
        >
          تنفيذ{" "}
        </button>
      </form>
    </div>
  );

  return (
    <div className="w-full ">
      <MainAdmin content={content} info="إضافة صف جديد" />
    </div>
  );
};

export default AddGrade;
