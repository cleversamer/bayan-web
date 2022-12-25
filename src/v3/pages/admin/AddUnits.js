/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import levelsApi from "v3/api/tutorial/levels";
import gradesApi from "v3/api/tutorial/grades";
import seasonsApi from "v3/api/tutorial/seasons";
import subjectsApi from "v3/api/tutorial/subjects";
import unitsApi from "v3/api/tutorial/units";
import toast from "v3/services/toast";

import MainAdmin from "./MainAdmin";

const AddUnits = () => {
  const [formData, setFormData] = useState({
    levels: [],
    grades: [],
    seasons: [],
    subjects: [],
    levelId: "",
    gradeId: "",
    seasonId: "",
    subjectId: "",
    title: "",
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

  useEffect(() => {
    if (!formData.seasonId || formData.seasonId === "select") {
      return;
    }

    subjectsApi
      .getSeasonSubjects(formData.seasonId)
      .then((res) => {
        setFormData({ ...formData, subjects: res.data });
      })
      .catch((err) => {
        toast.showWarning(err?.response?.data?.message?.ar || err.message);
      });
  }, [formData.seasonId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, submitting: true });

    const { subjectId, title } = formData;
    unitsApi
      .createUnit(subjectId, title)
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
          subjects: [],
          levelId: "",
          gradeId: "",
          seasonId: "",
          subjectId: "",
          title: "",
          submitting: false,
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  };

  const handleChange = (key) => (e) =>
    setFormData({ ...formData, [key]: e.target.value });

  const content = (
    <div className="w-full flex items-start justify-end text-right text-[#26ABBB]">
      <form onSubmit={handleSubmit}>
        <label className="mt-4">اختر المرحلة </label>

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

        <label className="mt-4">اختر الصف </label>

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

        <label className="mt-4">اختر الفصل</label>

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

        <label className="mt-4">اختر المادة</label>

        <select
          required
          onChange={handleChange("subjectId")}
          value={formData.subjectId}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر المادة{" "}
          </option>

          {formData.subjects.map((e) => {
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
          onChange={handleChange("title")}
          value={formData.title}
          type="text"
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        />

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
      <MainAdmin content={content} info="اضافة  وحدة  " />
    </div>
  );
};

export default AddUnits;
