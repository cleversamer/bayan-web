/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const Toggler = () => {
  const backgrounds = ["/assets/1.jpg", "/assets/2.jpg", "/assets/3.jpg"];
  const [background, setBackground] = useState({ background: "" });

  useEffect(() => {
    setInterval(() => {
      setBackground(
        backgrounds[Math.floor(Math.random() * backgrounds.length)]
      );
    }, 2000);

    return () => {
      clearInterval();
    };
  }, []);

  return (
    <div className="rounded-lg w-full relative h-[373px] mt-10 ">
      <img
        src={background}
        className="absolute top-0 left-0 w-full h-full -z-10 object-cover"
        alt=""
      />

      <div className="absolute top-0 left-0 w-full h-full -z-0 bg-black/20"></div>

      <div className="absolute w-full h-full top-0 right-0 bg-black/20"></div>

      <div className="w-fit h-full p-4 bg-transparent mx-auto flex items-center justify-center flex-col text-white relative">
        <p className="font-bold">كل اللي تحتاجه للتفوق بمكان واحد</p>

        <button className="px-3 py-2 rounded-[50px] border-solid border-[1px] border-white">
          شاهد المزيد
        </button>
      </div>
    </div>
  );
};

export default Toggler;
