import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Main = (Children) => {
  const navigate = useNavigate();

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
          <h1 className="bg-[#26ABBB] flex flex-row-reverse justify-between px-[20px] text-right w-full h-[10vh] text-white py-2 pr-10 m-0">
            <span>لوحة الإضافة</span>

            <BtnNavigate onClick={() => navigate("/admin")}>
              لوحة التحكم
            </BtnNavigate>
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
            إضافة مرحلة{" "}
          </Link>

          <Link
            to="/admin/addClass"
            id="link2"
            className={renderListItemClasses("/admin/addClass")}
          >
            {" "}
            إضافة صف{" "}
          </Link>

          <Link
            to="/admin/addSeason"
            id="link3"
            className={renderListItemClasses("/admin/addSeason")}
          >
            {" "}
            إضافة فصل دراسي{" "}
          </Link>

          <Link
            to="/admin/addSubjects"
            id="link4"
            className={renderListItemClasses("/admin/addSubjects")}
          >
            {" "}
            إضافة مادة{" "}
          </Link>

          <Link
            to="/admin/AddUnits"
            id="link5"
            className={renderListItemClasses("/admin/AddUnits")}
          >
            {" "}
            إضافة وحدة دراسية{" "}
          </Link>

          <Link
            to="/admin/addLesson"
            id="link6"
            className={renderListItemClasses("/admin/addLesson")}
          >
            {" "}
            إضافة درس{" "}
          </Link>

          <Link
            to="/admin/addvideo"
            id="link7"
            className={renderListItemClasses("/admin/addvideo")}
          >
            {" "}
            إضافة فيديو{" "}
          </Link>

          <Link
            to="/admin/adddoc"
            id="link8"
            className={renderListItemClasses("/admin/adddoc")}
          >
            {" "}
            إضافة تلخيص{" "}
          </Link>

          <Link
            to="/admin/addquiz"
            id="link9"
            className={renderListItemClasses("/admin/addquiz")}
          >
            {" "}
            إضافة كويز{" "}
          </Link>

          <Link
            to="/admin/addquizquestion"
            id="link10"
            className={renderListItemClasses("/admin/addquizquestion")}
          >
            إضافة أسئلة لكويز{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

const Button = styled.button`
  background-color: ${({ blue, selected }) =>
    blue || selected ? "#26ABBB" : "#888"};
  width: fit-content;
  min-width: 100px;
  color: #fff;
  border-radius: 4px;
  transition-duration: 176ms;

  :active {
    transform: scale(0.97);
  }
`;

const BtnNavigate = styled(Button)`
  width: 120px;
  font-size: 18px;
`;

export default Main;
