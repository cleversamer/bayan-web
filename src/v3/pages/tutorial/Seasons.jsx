/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import seasonsApi from "v2/api/tutorial/seasons";

import Footer from "v2/components/Footer";
import Heading from "v2/components/Heading";
import Navbar from "v2/components/Navbar";
import Social from "v2/components/Social";
import WhatsApp from "v2/components/WhatsApp";

const Seasons = () => {
  const { gradeId } = useParams();
  const [seasons, setSeasons] = useState({ data: [], loading: false });

  useEffect(() => {
    window.scrollTo({ top: 130, behavior: "smooth" });
    setSeasons({ ...seasons, loading: true });

    seasonsApi
      .getGradeSeasons(gradeId)
      .then((res) => {
        setSeasons({ ...seasons, data: res.data });
      })
      .catch((err) => {
        //
      });
  }, [gradeId]);

  return (
    <>
      <Social />
      <Navbar target="main" />
      <div className="w-full md:w-[80%] mx-auto my-[80px]">
        <Heading main="الفصول الدراسية" />

        <div className=" w-full flex justify-between items-start flex-col">
          <div className="w-fit md:w-full mx-auto flex-col md:flex-row-reverse flex items-end justify-center mt-6 gap-[20px] md:gap-6">
            {seasons.data.map((season) => {
              return (
                <Link
                  to={`/subjects/${season._id}/season/${gradeId}`}
                  key={season._id}
                  className="bg-white group no-underline text-black rounded-lg  delay-100    hover:-rotate-3 shadow-lg flex flex-col justify-center items-center w-[276px] p-[25px] min-h-[180px]  "
                >
                  <img
                    src={`http://localhost:4000${season.photoURL}`}
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

export default Seasons;
