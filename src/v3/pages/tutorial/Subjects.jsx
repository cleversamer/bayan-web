/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import subjectsApi from "v3/api/tutorial/subjects";
import packageApi from "v3/api/tutorial/package";

import Footer from "v3/components/Footer";
import Heading from "v3/components/Heading";
import Navbar from "v3/components/Navbar";
import Social from "v3/components/Social";
import WhatsApp from "v3/components/WhatsApp";

const Subjects = () => {
  const { seasonId, gradeId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 130, behavior: "smooth" });

    subjectsApi
      .getSeasonSubjects(seasonId)
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((err) => {
        //
      });
  }, []);

  useEffect(() => {
    packageApi
      .getGradePackages(gradeId)
      .then((res) => {
        setPackages(res.data);
      })
      .catch((err) => {
        //
      });
  }, []);

  return (
    <>
      <Social />

      <Navbar target="main" />
      <div className="w-full md:w-[80%] mx-auto my-[80px]">
        <div className=" w-full flex justify-between items-start flex-col   ">
          <Heading main="المواد الدراسية" />

          <div className=" w-fit mx-auto md:w-full flex flex-wrap items-center justify-center my-[60px] gap-[60px] px-3">
            {subjects.map((subject) => {
              return (
                <Link
                  to={`/lessons/${subject._id}`}
                  key={subject._id}
                  className="bg-white no-underline delay-100    hover:-rotate-3 text-black rounded-3xl shadow-lg flex flex-col justify-center items-center w-[276px] p-[25px] min-h-[180px] "
                >
                  <p className="p-0  m-0 text-[15px] xl:text-[17px] text-center text-[#8D8D8D]">
                    {subject.title}
                  </p>
                  <p className="p-0  m-0 text-[18px] xl:text-[20px] text-center">
                    {subject.materialNameInArabic}
                  </p>
                  <img
                    src={subject.photoURL}
                    alt=""
                    className="w-[180px] object-cover block"
                  />
                </Link>
              );
            })}
          </div>
          <div className="mt-[140px] w-full">
            <p className="text-right w-full text-[36px] px-3">
              الباقات الدراسية
            </p>

            <div className="w-fit mx-auto md:w-full flex flex-row-reverse flex-wrap items-center justify-center my-[60px] gap-[60px] px-3">
              {packages.map((_package) => {
                return (
                  <Link
                    to={`/classId/${gradeId}/season/${seasonId}/package/${_package._id}/packageCapacity/${_package.numOfSubjects}`}
                    key={_package._id}
                    className="bg-white no-underline text-black rounded-3xl  shadow-lg  flex flex-col justify-center items-center w-[300px] p-[15px] min-h-[180px] "
                  >
                    <div className="w-full flex items-start justify-start">
                      <img
                        src="/package.png"
                        alt=""
                        className="w-[200px] object-cover block"
                      />
                    </div>
                    <div className="w-full flex flex-col items-end justify-center">
                      <p className="p-0  m-0 text-[15px] xl:text-[17px] text-center text-[#8D8D8D]">
                        باقة {_package.numOfSubjects} مواد
                      </p>
                      <p className="p-0  m-0 text-[18px] xl:text-[20px] text-center">
                        {" "}
                        {_package.price} ${" "}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <WhatsApp />
    </>
  );
};

export default Subjects;
