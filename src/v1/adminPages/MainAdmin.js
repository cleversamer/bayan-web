import React from "react";
import { Link } from "react-router-dom";

const Main = (Children) => {
  const renderListItemClasses = (link) => {
    let classes =
      "w-full classItems py-2 no-underline text-white border-b-[1px] border-solid border-white text-[12px]  px-3 mb-2";

    if (window.location.pathname === `${link}`) {
      classes += " selected";
    }
    return classes;
  };
  return (
    <>
      <div className="w-full flex items-start justify-between  ">
        <div className="w-[85%] flex flex-col justify-center items-center ">
          <h1 className="bg-[#26ABBB] text-right w-full h-[10vh] text-white py-2 pr-10 m-0">
            لوحة التحكم || منصة بيان{" "}
          </h1>
          <h2 className="bg-white text-right w-full  text-[#26ABBB]  py-4 pr-4 m-0 ">
            {Children.info}{" "}
          </h2>
          <div className="w-full p-2">{Children.content}</div>
        </div>
        <div className="w-[15%] h-[100vh] fixed top-0 right-0  flex flex-col justify-start items-start gap-2 p-6  bg-[#26ABBB] text-right">
          <Link
            to="/admin/addlevel"
            id="link1"
            className={renderListItemClasses("/admin/addlevel")}
          >
            {" "}
            اضافة مرحلة{" "}
          </Link>
          <Link
            to="/admin/addClass"
            id="link2"
            className={renderListItemClasses("/admin/addClass")}
          >
            {" "}
            اضافة صف{" "}
          </Link>
          <Link
            to="/admin/addSeason"
            id="link3"
            className={renderListItemClasses("/admin/addSeason")}
          >
            {" "}
            اضافة فصل دراسي{" "}
          </Link>
          <Link
            to="/admin/addSubjects"
            id="link4"
            className={renderListItemClasses("/admin/addSubjects")}
          >
            {" "}
            اضافة مادة{" "}
          </Link>
          <Link
            to="/admin/AddUnits"
            id="link5"
            className={renderListItemClasses("/admin/AddUnits")}
          >
            {" "}
            اضافة وحدة دراسية{" "}
          </Link>
          <Link
            to="/admin/addLesson"
            id="link6"
            className={renderListItemClasses("/admin/addLesson")}
          >
            {" "}
            اضافة درس{" "}
          </Link>
          <Link
            to="/admin/addvideo"
            id="link7"
            className={renderListItemClasses("/admin/addvideo")}
          >
            {" "}
            اضافة فيديو{" "}
          </Link>
          <Link
            to="/admin/adddoc"
            id="link8"
            className={renderListItemClasses("/admin/adddoc")}
          >
            {" "}
            اضافة ملحق{" "}
          </Link>
          <Link
            to="/admin/addquiz"
            id="link9"
            className={renderListItemClasses("/admin/addquiz")}
          >
            {" "}
            اضافةاختبار قصير{" "}
          </Link>
          <Link
            to="/admin/addquizquestion"
            id="link10"
            className={renderListItemClasses("/admin/addquizquestion")}
          >
            إضافة اسئلة للاختبارات{" "}
          </Link>
          {/* <Link to='/admin/addquizquestion'   onClick={renderListItemClasses("link10")} id='link10' className='w-full classItems py-2 no-underline text-white border-b-[1px] border-solid border-white text-[12px]  px-3 mb-2'  >إضافة اسئلة للاختبارات    </Link> */}
        </div>
      </div>
    </>
  );
};

export default Main;
