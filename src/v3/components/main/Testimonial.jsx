import { AiFillPlayCircle } from "react-icons/ai";

const Testimonial = ({ setShowVideo }) => {
  return (
    <div className=" flex items-center lg:items-end justify-center flex-col">
      <h1 className=" text-[30px] xl:text-[40px] text-[#24343F] text-right hidden md:block ">
        انطلق مع بيان نحو التفوق
      </h1>

      <p className="lg:w-[500px] text-[20px] xl-text-[25px]  text-[#7f7f7f] hidden md:block md:text-right  ">
        تميز و حلق في سماء التفوق , بانضمامك لمنصة بيان التعليمية حيث الدوس
        التعليمية الشيقة والمذكرات والمراجعات الذهبية{" "}
      </p>

      <button
        className="bg-[#26ABBB] mt-[35px] flex items-center justify-center gap-[20px] text-white px-4 py-3 rounded-[50px] no-underline"
        onClick={() => setShowVideo(true)}
      >
        {" "}
        تعرف علينا <AiFillPlayCircle size={25} />{" "}
      </button>
    </div>
  );
};

export default Testimonial;
