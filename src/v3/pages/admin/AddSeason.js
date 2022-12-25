/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import levelsApi from "v3/api/tutorial/levels";
import gradesApi from "v3/api/tutorial/grades";
import seasonsApi from "v3/api/tutorial/seasons";
import toast from "v3/services/toast";

import MainAdmin from "./MainAdmin";
import PopupMessage from "v3/components/PopupMessage";

const AddSeason = () => {
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState("");
  const [formData, setFormData] = useState({
    levels: [],
    grades: [],
    levelId: "",
    gradeId: "",
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
        toast.showWarning(err?.response?.data?.message?.ar || err.message);
      });
  }, []);

  useEffect(() => {
    if (!formData.levelId || formData.levelId === "select") {
      return;
    }

    gradesApi
      .getLevelGrades(formData.levelId)
      .then((res) => {
        setFormData({ ...formData, grades: res.data });
      })
      .catch((err) => {
        toast.showWarning(err?.response?.data?.message?.ar || err.message);
      });
  }, [formData.levelId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, submitting: true });

    const { gradeId, number, photo } = formData;
    seasonsApi
      .createSeason(gradeId, number, photo)
      .then((res) => {
        toast.showSuccess("تمت العملية بنجاح");
      })
      .catch((err) => {
        toast.showWarning(err?.response?.data?.message?.ar || err.message);
      })
      .finally(() => {
        setFormData({
          levels: formData.levels,
          grades: [],
          levelId: "",
          gradeId: "",
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
      {formData.submitting && <PopupMessage message="جاري إضافة الفصل" />}

      <form onSubmit={handleSubmit} id="my_form">
        <label className="mt-4">اختر المرحلة </label>

        <select
          required
          value={formData.levelId}
          onChange={handleChange("levelId")}
          className="w-full h-[40px] text-black  pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر المرحلة
          </option>

          {formData.levels.map((level) => (
            <option value={level._id} key={level._id}>
              {level.title}
            </option>
          ))}
        </select>

        <label className="mt-4">اختر الصف</label>

        <select
          required
          onChange={handleChange("gradeId")}
          value={formData.gradeId}
          className=" w-full h-[40px] text-black  pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر الصف{" "}
          </option>

          {formData.grades.map((grade) => (
            <option className="text-black" value={grade._id} key={grade._id}>
              {grade.number}{" "}
            </option>
          ))}
        </select>

        <label className="mt-4">رقم الفصل </label>

        <input
          required
          type="number"
          value={formData.number}
          onChange={handleChange("number")}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        />

        <label className="mt-4">صورة الفصل</label>

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
          className="bg-[#26ABBB] rounded-3xl py-2 px-3 my-4 lg:px-4 border-[#24343F]  text-white text-base "
          disabled={formData.submitting}
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
