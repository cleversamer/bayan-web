/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import levelsApi from "v2/api/tutorial/levels";
import gradesApi from "v2/api/tutorial/grades";
import seasonsApi from "v2/api/tutorial/seasons";
import subjectsApi from "v2/api/tutorial/subjects";
import unitsApi from "v2/api/tutorial/units";
import lessonsApi from "v2/api/tutorial/lessons";
import videoApi from "v2/api/lesson/video";
import toast from "v2/services/toast";

import MainAdmin from "./MainAdmin";

const AddVideo = () => {
  const [formData, setFormData] = useState({
    levels: [],
    grades: [],
    seasons: [],
    subjects: [],
    units: [],
    lessons: [],

    levelId: "",
    gradeId: "",
    seasonId: "",
    subjectId: "",
    unitId: "",
    lessonId: "",

    title: "",
    videoType: "url",
    videoURL: "",
    description: "",
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

  useEffect(() => {
    if (!formData.subjectId || formData.subjectId === "select") {
      return;
    }

    unitsApi
      .getSubjectUnits(formData.subjectId)
      .then((res) => {
        setFormData({ ...formData, units: res.data.units });
      })
      .catch((err) => {
        toast.showWarning(err?.response?.data?.message?.ar || err.message);
      });
  }, [formData.subjectId]);

  useEffect(() => {
    if (!formData.unitId || formData.unitId === "select") {
      return;
    }

    lessonsApi
      .getUnitLessons(formData.unitId)
      .then((res) => {
        setFormData({ ...formData, lessons: res.data });
      })
      .catch((err) => {
        toast.showWarning(err?.response?.data?.message?.ar || err.message);
      });
  }, [formData.unitId]);

  const handleChange = (key) => (e) =>
    setFormData({ ...formData, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, submitting: true });

    const { lessonId, title, description, videoType, videoURL } = formData;
    videoApi
      .createVideo(lessonId, title, description, null, videoType, videoURL)
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
          units: [],
          lessons: [],

          levelId: "",
          gradeId: "",
          seasonId: "",
          subjectId: "",
          unitId: "",
          lessonId: "",

          title: "",
          videoType: "url",
          videoURL: "",
          description: "",
          submitting: false,
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  };

  const content = (
    <div className="w-full flex items-start justify-end text-right text-[#26ABBB]">
      <form onSubmit={handleSubmit}>
        <label className="mt-[5px]">اختر المرحلة </label>
        <select
          required
          onChange={handleChange("levelId")}
          value={formData.levelId}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
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

        <label className="mt-[5px]">اختر الصف </label>
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

        <label className="mt-[5px]">اختر الفصل</label>
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

        <label className="mt-[5px]">اختر المادة</label>
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

        <label className="mt-[5px]">اختر الوحدة </label>
        <select
          required
          onChange={handleChange("unitId")}
          value={formData.unitId}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر الوحدة{" "}
          </option>

          {formData.units.map((e) => {
            return (
              <option value={e._id} key={e._id}>
                {e.title}
              </option>
            );
          })}
        </select>

        <label className="mt-[5px]"> اختر الدرس </label>
        <select
          required
          onChange={handleChange("lessonId")}
          value={formData.lessonId}
          className="w-full h-[40px]   pr-3 focus:outline-none text-right rounded-lg border-solid border-[1px] border-[#26ABBB] "
        >
          <option value="select" defaultValue>
            اخنر الدرس{" "}
          </option>
          {formData.lessons.map((e) => {
            return (
              <option value={e._id} key={e._id}>
                {e.title}
              </option>
            );
          })}
        </select>

        <div className="w-full">
          <label className="mt-[2px]"> عنوان الفيديو </label>

          <input
            required
            type="text"
            onChange={handleChange("title")}
            value={formData.title}
            id="name"
            className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-3"
          />
        </div>

        <div className="w-full">
          <label className="mt-[2px]"> وصف الفيديو </label>
          <input
            required
            type="text"
            onChange={handleChange("description")}
            value={formData.description}
            id="name"
            className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-3"
          />
        </div>

        <div className="w-full">
          <label className="mt-[2px]">رابط الفيديو</label>

          <input
            required
            type="text"
            onChange={handleChange("videoURL")}
            value={formData.videoURL}
            className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-3"
          />
        </div>

        <button
          className="bg-[#26ABBB] rounded-3xl py-2 px-3 my-4 lg:px-4 border-[#24343F]  text-white text-base "
          disabled={formData.submitting}
        >
          تنفيذ
        </button>
      </form>
    </div>
  );

  return (
    <div className="w-full ">
      <MainAdmin content={content} info="إضافة فيديو إلى درس  " />
    </div>
  );
};

export default AddVideo;
