import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gradesApi from "v3/api/tutorial/grades";

import Footer from "v3/components/Footer";
import Navbar from "v3/components/Navbar";
import Heading from "v3/components/Heading";
import Social from "v3/components/Social";
import WhatsApp from "v3/components/WhatsApp";

const Grades = () => {
  const { levelId } = useParams();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 130, behavior: "smooth" });

    gradesApi
      .getLevelGrades(levelId)
      .then((res) => {
        setGrades(res.data);
      })
      .catch((err) => {
        //
      });
  }, [levelId]);

  return (
    <>
      <Social />

      <Navbar target="main" />

      <div className="w-full md:w-[80%] mx-auto my-[80px]">
        <div className=" w-full flex justify-between items-start flex-col   ">
          <Heading main="الصفوف الدراسية" />

          <div className="w-fit md:w-full mx-auto flex-col md:flex-row-reverse flex items-end justify-center mt-6 gap-[20px] md:gap-6">
            {grades.map((e) => {
              return (
                <Link
                  to={`/season/${e._id}`}
                  key={e._id}
                  className="bg-white group no-underline text-black rounded-lg  delay-100    hover:-rotate-3 shadow-lg flex flex-col justify-center items-center w-[276px] p-[25px] min-h-[180px]  "
                >
                  <img
                    src={e.photoURL}
                    alt=""
                    className="w-[180px] object-cover block "
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />

      <WhatsApp />
    </>
  );
};

export default Grades;
