import { Link } from "react-router-dom";

const LevelsList = ({ levels }) => {
  console.log(levels);
  return (
    <div className=" flex gap-2 items-end justify-center  relative px-4 w-full lg:w-[50%] lg:max-w-[50%] mt-5 md:mt-0 ">
      {levels.map((level) => (
        <Link
          key={level._id}
          to={`/class/${level._id}`}
          className="children no-underline  hover:scale-110 duration-100 max-w-[220px] "
        >
          <img src={level.photoURL} className={`block`} alt="" />

          <p className="text-black w-fit mx-auto mt-[20px]  text-center text-[13px] md:text-[18px]">
            {level.title}
          </p>
        </Link>
      ))}

      <p className=" absolute w-[170px] md:w-[210px] left-[46%] top-[-4%] md:top-[-10%] bg-[#26ABBB] text-[10px] md:text-[16px]  flex items-center justify-center text-white px-3 md:px-4 py-2 md:py-3 rounded-t-[50px] rounded-br-[25px]">
        سجل دخولك حسب المرحلة
      </p>
    </div>
  );
};

export default LevelsList;
