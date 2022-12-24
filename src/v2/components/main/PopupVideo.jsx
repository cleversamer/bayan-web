/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { AiOutlineFullscreenExit } from "react-icons/ai";

const PopupVideo = ({ setShowVideo }) => {
  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const keyDownHandler = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setShowVideo(false);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-[100vh] bg-black/75 z-50 flex flex-col justify-start items-center px-3 py-3 gap-4 ">
      <button className="w-full text-right flex items-end justify-end text-white texte-[50px]">
        {" "}
        <AiOutlineFullscreenExit
          size={40}
          onClick={() => setShowVideo(false)}
        />{" "}
      </button>

      <iframe
        src="https://www.youtube.com/embed/orneBvS4kbY"
        title="intro video"
        className="h-[80%] w-[90%] m-auto"
      ></iframe>
    </div>
  );
};

export default PopupVideo;
