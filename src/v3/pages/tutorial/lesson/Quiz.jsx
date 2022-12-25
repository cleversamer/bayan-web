import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "v3/api/client";
import { UserAuth } from "v3/auth/context";

const Quiz = () => {
  const { quizId } = useParams();
  const { user, baseUrl } = UserAuth();
  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get(`/lessons/quiz/${quizId}`).then((res) => {
      setQuiz(res.data);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between flex-col md:flex-row items-center w-[70%] mx-auto p-10">
        <div className="w-[50%] lg:w-[30%] flex flex-col items-center justify-center gap-6">
          {user?.avatarURL ? (
            <img
              src={user?.avatarURL}
              alt=""
              className="w-[150px] h-[150px] relative rounded-[50%] flex items-center justify-center "
            />
          ) : (
            <>
              <div className="w-[150px] h-[150px] relative rounded-[50%] flex items-center justify-center bg-[#26ABBB]">
                {user?.name[0].toUpperCase()}
              </div>
            </>
          )}
          <p className="text-center"> {user?.name} </p>
        </div>
        <div className="text-right">
          <p className="text-[35px]">{quiz?.title}</p>
          <p className="text-[30px] text-[#26ABBB] font-extrabold text-center">
            QUIZ
          </p>
        </div>
      </div>
      <form className="w-full  flex-col items-end justify-center gap-5 lg:w-[70%] mx-auto text-white font-bold text-right">
        {quiz.questions?.map((e) => {
          return (
            <div
              className="w-[95%] mx-auto rounded-lg bg-[#26ABBB] p-3 my-3 text-right flex flex-col items-end justify-center"
              key={e._id}
            >
              <p className="text-right">{e.title}</p>
              {e.photoURL && (
                <img
                  src={baseUrl + e.photoURL}
                  alt-=""
                  className="max-w-[300px]  object-cover "
                />
              )}
              <p className="text-right"> : اختر الاجابة</p>
              <div className="flex flex-col items-end justify-center">
                {e?.options.map((el) => {
                  if (el)
                    return (
                      <div>
                        <label>{el}</label>
                        <input
                          className="mx-2"
                          type="radio"
                          id="css"
                          name="fav_language"
                          value="CSS"
                        />
                      </div>
                    );
                })}
              </div>
            </div>
          );
        })}
        <div className="w-[95%] mx-auto  ">
          <button className="bg-[#26ABBB] rounded-lg p-3 my-3 px-4 border-[#24343F] no-underline text-white text-base w-fit">
            تسليم{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Quiz;
