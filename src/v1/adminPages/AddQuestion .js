import React, { useEffect, useState } from "react";
import MainAdmin from "./MainAdmin";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { addQuestion } from "./Operations";

const AddQuestion = () => {
  const { lessonId } = useParams();
  const [quizId, setQuizId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/lessons/${lessonId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        setQuizId(res.data.quiz[0]._id);
      });
  }, []);

  const [question, setQuestion] = useState();
  const [answare, setAnsware] = useState();
  const [opetionOne, setOpetionOne] = useState("");
  const [opetionTwo, setOpetionTwo] = useState("");
  const [opetionThree, setOpetionThree] = useState("");
  const [opetionFour, setOpetionFour] = useState("");
  const [file, setFile] = useState();

  const fileHandle = (e) => {
    const f = e.target.files[0];
    if (f.type === "image/png") setFile(e.target.files[0]);
  };

  const handling = (e) => {
    e.preventDefault();
    adding(
      question,
      answare,
      opetionOne,
      opetionTwo,
      opetionThree,
      opetionFour
    );
    // console.log(question, answare, opetionOne, opetionTwo, opetionThree, opetionFour)
    setQuestion("");
    setAnsware("");
    setOpetionOne("");
    setOpetionTwo("");
    setOpetionThree("");
    setOpetionFour("");
    document.getElementsByName("answare").forEach((e) => {
      e.checked = false;
    });
  };

  const finishHandling = (e) => {
    e.preventDefault();
    adding(
      question,
      answare,
      opetionOne,
      opetionTwo,
      opetionThree,
      opetionFour
    );
    navigate("/admin/addLevel");
  };

  const answareHandling = (inputValue) => {
    if (inputValue !== "") {
      setAnsware(inputValue);
    } else {
      setAnsware("");
      document.getElementsByName("answare").forEach((e) => {
        e.checked = false;
      });
    }
  };

  const adding = (question, answare, ...options) => {
    const fullOptions = [];
    options.forEach((e) => {
      if (e !== "") {
        fullOptions.push(e);
      }
    });
    addQuestion(quizId, question, answare, fullOptions, file);
  };
  const content = (
    <div className="w-full flex items-start justify-end text-right text-[#26ABBB]">
      <div className="max-w-[600px]">
        {/* onSubmit={handling} */}

        <label className="mt-[2px]">السؤال </label>
        <input
          required
          type="text"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
          className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
        />

        <label className="mt-[7px]">
          <input
            type="radio"
            name="answare"
            onChange={(e) => answareHandling(opetionOne)}
            className="mx-3"
          />
          الخيار الاول{" "}
        </label>
        <input
          required
          type="text"
          onChange={(e) => setOpetionOne(e.target.value)}
          value={opetionOne}
          className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
        />

        <label className="mt-[7px]">
          <input
            type="radio"
            name="answare"
            onChange={(e) => answareHandling(opetionTwo)}
            className="mx-3"
          />
          الخيار الثاني{" "}
        </label>
        <input
          required
          type="text"
          onChange={(e) => setOpetionTwo(e.target.value)}
          value={opetionTwo}
          className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
        />

        <label className="mt-[7px]">
          <input
            type="radio"
            name="answare"
            onChange={(e) => answareHandling(opetionThree)}
            className="mx-3"
          />
          الخيار الثالث{" "}
        </label>
        <input
          type="text"
          onChange={(e) => setOpetionThree(e.target.value)}
          value={opetionThree}
          className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
        />

        <label className="mt-[7px]">
          <input
            type="radio"
            name="answare"
            onChange={(e) => answareHandling(opetionFour)}
            className="mx-3"
          />
          الخيار الرابع{" "}
        </label>
        <input
          type="text"
          onChange={(e) => setOpetionFour(e.target.value)}
          value={opetionFour}
          className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
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
        <div className="flex justify-end items-start gap-4 mt-3">
          <button
            className="bg-[#26ABBB] rounded-3xl py-2 px-3 my-2 lg:px-4 border-[#24343F]  text-white text-base "
            onClick={finishHandling}
          >
            إضافة الكويز{" "}
          </button>
          <button
            className="bg-[#26ABBB] rounded-3xl py-2 px-3 my-2 lg:px-4 border-[#24343F]  text-white text-base "
            onClick={handling}
          >
            إضافة سؤال أخر{" "}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full ">
      <MainAdmin content={content} info="إضافة اسئلة للاختبارات" />
    </div>
  );
};

export default AddQuestion;
