/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import levelsApi from "v2/api/tutorial/levels";
import gradesApi from "v2/api/tutorial/grades";
import seasonsApi from "v2/api/tutorial/seasons";
import subjectsApi from "v2/api/tutorial/subjects";
import toast from "v2/services/toast";

import MainAdmin from "./MainAdmin";
import PopupMessage from "v2/components/PopupMessage";

const AddSubjects = () => {
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState("");
  const [formData, setFormData] = useState({
    levels: [],
    grades: [],
    seasons: [],
    levelId: "",
    gradeId: "",
    seasonId: "",
    title: "",
    photo: null,
    videoType: "url",
    videoURL: "",
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

  useEffect(() => {
    if (!formData.gradeId || formData.gradeId === "select") {
      return;
    }

    seasonsApi
      .getGradeSeasons(formData.gradeId)
      .then((res) => {
        setFormData({ ...formData, seasons: res.data });
      })
      .catch((err) => {
        toast.showWarning(err?.response?.data?.message?.ar || err.message);
      });
  }, [formData.gradeId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, submitting: true });

    const { seasonId, title, videoType, videoURL, photo } = formData;
    subjectsApi
      .createSubject(seasonId, title, videoType, null, videoURL, photo)
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
          seasons: [],
          levelId: "",
          gradeId: "",
          seasonId: "",
          title: "",
          photo: null,
          videoType: "url",
          videoURL: "",
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
      {formData.submitting && <PopupMessage message="جاري إضافة المادة" />}

      <form onSubmit={handleSubmit}>
        <label className="mt-2">اختر المرحلة </label>

        <select
          required
          onChange={handleChange("levelId")}
          value={formData.levelId}
          className="w-full h-[40px] text-black  pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر المرحلة{" "}
          </option>

          {formData.levels.map((level) => {
            return (
              <option value={level._id} key={level._id}>
                {level.title}
              </option>
            );
          })}
        </select>

        <label className="mt-2">اختر الصف </label>

        <select
          required
          onChange={handleChange("gradeId")}
          value={formData.gradeId}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر الصف{" "}
          </option>

          {formData.grades.map((e) => {
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
          onChange={handleChange("seasonId")}
          value={formData.seasonId}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر الفصل{" "}
          </option>

          {formData.seasons.map((e) => {
            return (
              <option value={e._id} key={e._id}>
                {e.number}
              </option>
            );
          })}
        </select>

        <label className="mt-2"> اسم المادة </label>
        <input
          required
          type="text"
          value={formData.title}
          onChange={handleChange("title")}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        />

        <div className="w-full text-right flex justify-end items-end mt-2 flex-col">
          <label className="">رابط فيديو المادة</label>

          <input
            required
            type="text"
            onChange={handleChange("videoURL")}
            value={formData.videoURL}
            className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
          />
        </div>

        <label className="mt-4">صورة المادة </label>

        <div className="w-full text-right flex  justify-end align-center items-center py-3">
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
      <MainAdmin content={content} info="اضافة مادة" />
    </div>
  );
};

export default AddSubjects;
