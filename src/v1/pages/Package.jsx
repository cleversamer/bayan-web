import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import Socil from "../components/Socil";
import { UserAuth } from "../context/AuthContext";
import { FaWhatsappSquare } from "react-icons/fa";

const Package = () => {
  const [selectedMaterial, setSelectedMaterial] = useState([]);
  const { seasonId, packageId, packageCapacity } = useParams();
  const { material, baseUrl, GetMaterial, Subscribe, errorMessage } =
    UserAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    GetMaterial(seasonId);
  }, []);
  function toggler(id) {
    var x = document.getElementById("p" + id);
    if (x.style.display === "block") {
      x.style.display = "none";
      document.getElementById("b" + id).innerHTML = "+";
    } else {
      x.style.display = "block";
      document.getElementById("b" + id).innerHTML = "-";
    }
  }
  function submitHandling() {
    if (
      selectedMaterial.length == parseInt(packageCapacity) &&
      errorMessage !== "أنت مشترك بالفعل في بعض أو كل المواد التي اخترتها"
    ) {
      Subscribe(packageId, selectedMaterial);
      window.open("https://wa.me/+970567682999", "_blank");
    }
  }

  function packageAdding(id) {
    if (
      document.getElementById(id).checked &&
      selectedMaterial.length < parseInt(packageCapacity)
    ) {
      setSelectedMaterial((pre) => [...pre, document.getElementById(id).value]);
    } else if (!document.getElementById(id).checked) {
      setSelectedMaterial((current) =>
        current.filter((selected) => {
          return selected !== document.getElementById(id).value;
        })
      );
    } else {
      document.getElementById(id).checked = false;
    }
  }
  return (
    <>
      <Socil />
      <Navbar target="main" />
      <div className="w-full md:w-[80%] mx-auto my-[80px]">
        <div className=" w-full flex justify-between items-start flex-col   ">
          <Heading main="الباقات الدراسية" sec="" />
          <div className="mt-[50px] pt-0 flex flex-col items-center justify-center w-full">
            <p className=" text-[25px] text-[#26ABBB]"> المواد </p>
          </div>
          <div className=" w-fit mx-auto md:w-full flex flex-row-reverse flex-wrap items-center justify-center my-[30px] gap-[60px] px-3">
            {material.map((el) => {
              return (
                <div key={el._id} className="flex flex-col relative">
                  <label
                    htmlFor={el._id}
                    className="cursor-pointer bg-white no-underline text-black rounded-3xl shadow-lg flex flex-col justify-center items-center w-[276px] p-[25px] min-h-[180px] "
                  >
                    <p className="p-0  m-0 text-[15px] xl:text-[17px] text-center text-[#8D8D8D]">
                      {el.title}
                    </p>
                    <img
                      src={baseUrl + el.photoURL}
                      alt=""
                      className="w-[180px] object-cover block"
                    />
                  </label>
                  <input
                    type="checkbox"
                    id={el._id}
                    className="absolute bottom-2 left-4 my-[10px] w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    value={el._id}
                    onChange={() => {
                      packageAdding(el._id);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <p className="texte-center w-full">{errorMessage}</p>
          <div className="mt-[100px] pt-0 flex flex-col items-center justify-center w-full">
            <button
              onClick={submitHandling}
              className=" text-[25px] bg-[#26ABBB] text-white px-4 py-3 rounded-lg no-underline"
            >
              اشترك الأن{" "}
            </button>
          </div>
          <div className="mt-[50px] pt-0 flex flex-col items-center justify-center w-full">
            <p className=" text-[25px] text-[#26ABBB]">
              {" "}
              كل اللي تحتاجة للتفوق{" "}
            </p>
            <p className="text-[22px] w-fit  text-center">
              اتقن موادك مع أفضل طرق و احدث تقنيات التعليم
            </p>
            <div className="w-fit mx-auto md:w-full flex flex-row-reverse flex-wrap items-center justify-center my-[60px] gap-[50px] px-3">
              <div className="px-4  py-3 rounded-3xl bg-[#26ABBB] flex items-center justify-center">
                <img
                  src="/assets/offline-class.png"
                  alt=""
                  className="w-[60px] object-cover"
                />
              </div>

              <div className="px-4  py-3  rounded-3xl bg-[#26ABBB] flex items-center justify-center">
                <img
                  src="/assets/chatting.png"
                  alt=""
                  className="w-[60px] object-cover"
                />
              </div>
              <div className="px-4  py-3  rounded-3xl bg-[#26ABBB] flex items-center justify-center">
                <img
                  src="/assets/video-call.png"
                  alt=""
                  className="w-[60px] object-cover"
                />
              </div>
              <div className="px-4  py-3  rounded-3xl bg-[#26ABBB] flex items-center justify-center">
                <img
                  src="/assets/search-book.png"
                  alt=""
                  className="w-[60px] object-cover"
                />
              </div>
              <div className="px-4  py-3 rounded-3xl bg-[#26ABBB] flex items-center justify-center">
                <img
                  src="/assets/paper.png"
                  alt=""
                  className="w-[40px] object-cover"
                />
              </div>
            </div>
          </div>
          <div className="mt-[100px] pt-0 flex flex-col items-center justify-center w-full">
            <p className=" text-[25px] text-[#26ABBB]">أسئلة شائعة</p>
            <p className="text-[22px] w-fit  text-center">
              اتقن موادك مع أفضل طرق و احدث تقنيات التعليم
            </p>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-[60px]">
            <div className="w-[70%] mx-auto">
              <div className="w-full flex justify-between items-center bg-gray-300 px-3 py-2 rounded-lg mb-2">
                <button
                  className="text-[25px] "
                  id="b1"
                  onClick={() => toggler(1)}
                >
                  +
                </button>
                <p className="text-[14px] text-right md:text-[22px] pb-0 mb-0">
                  ما هي الباقة؟
                </p>
              </div>
              <div className="w-full flex justify-center items-center ">
                <p className="w-full text-right hidden" id="p1">
                  الباقة عبارة عن سلة مواد توفرها علا لك بأسعار مخفضة وتشمل
                  السلة المواد التي تحتاجها أثناء دراستك حسب تخصصك و مرحلتك
                  الدراسية
                </p>
              </div>
            </div>
            <div className="w-[70%] mx-auto">
              <div className="w-full flex justify-between items-center bg-gray-300 px-3 py-2 rounded-lg mb-2">
                <button
                  className="text-[25px] "
                  id="b2"
                  onClick={() => toggler(2)}
                >
                  +
                </button>
                <p className="text-[14px] text-right md:text-[22px] pb-0 mb-0">
                  {" "}
                  هل يوجد فرق في الدراسة أو المحتوى من خلال اشتراك الباقة او من
                  خلال اشتراك لمادة واحدة فقط؟
                </p>
              </div>
              <div className="w-full flex justify-center items-center ">
                <p className="w-full text-right hidden" id="p2">
                  الباقة عبارة عن سلة مواد توفرها علا لك بأسعار مخفضة وتشمل
                  السلة المواد التي تحتاجها أثناء دراستك حسب تخصصك و مرحلتك
                  الدراسية
                </p>
              </div>
            </div>
            <div className="w-[70%] mx-auto">
              <div className="w-full flex justify-between items-center bg-gray-300 px-3 py-2 rounded-lg mb-2">
                <button
                  className="text-[25px] "
                  id="b3"
                  onClick={() => toggler(3)}
                >
                  +
                </button>
                <p className="text-[14px] text-right md:text-[22px] pb-0 mb-0">
                  {" "}
                  لدي اشتراك في إحدى المواد، ماذا سيحدث اذا اشتركت كورس في باقة؟
                </p>
              </div>
              <div className="w-full flex justify-center items-center ">
                <p className="w-full text-right hidden" id="p3">
                  الباقة عبارة عن سلة مواد توفرها علا لك بأسعار مخفضة وتشمل
                  السلة المواد التي تحتاجها أثناء دراستك حسب تخصصك و مرحلتك
                  الدراسية
                </p>
              </div>
            </div>
            <div className="w-[70%] mx-auto">
              <div className="w-full flex justify-between items-center bg-gray-300 px-3 py-2 rounded-lg mb-2">
                <button
                  className="text-[25px] "
                  id="b4"
                  onClick={() => toggler(4)}
                >
                  +
                </button>
                <p className="text-[14px] text-right md:text-[22px] pb-0 mb-0">
                  هل أستطيع استرداد اشتراكات الباقات؟
                </p>
              </div>
              <div className="w-full flex justify-center items-center ">
                <p className="w-full text-right hidden" id="p4">
                  الباقة عبارة عن سلة مواد توفرها علا لك بأسعار مخفضة وتشمل
                  السلة المواد التي تحتاجها أثناء دراستك حسب تخصصك و مرحلتك
                  الدراسية
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <a
        href="https://wa.me/+970567682999"
        target="_blank"
        className="fixed bottom-0 right-0  md:right-10 hover:text-[#25d366] text-[#25d366] "
      >
        <FaWhatsappSquare size={80} />
      </a>
    </>
  );
};

export default Package;
