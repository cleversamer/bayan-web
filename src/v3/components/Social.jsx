/* eslint-disable react/jsx-no-target-blank */
import { AiOutlineInstagram, AiFillYoutube } from "react-icons/ai";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

const Social = () => {
  return (
    <div className="relative pt-4 lg:fixed lg:left-0 lg:top-[50%] lg:translate-y-[-50%]  lg:justify-center lg:items-center  lg:p-3  ">
      <div
        className="flex justify-center items-center flex-row  gap-4 lg:hidden"
        id="someRandomID"
      >
        <a
          href="https://www.facebook.com/%D9%85%D9%86%D8%B5%D8%A9-%D8%A8%D9%8A%D8%A7%D9%86-%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%D9%8A%D8%A9-103664719122610/"
          target="_blank"
          className="mr-2 text-[#26ABBB] text-3xl lg:text-5xl"
          alt=""
        >
          {" "}
          <FaFacebookF />
        </a>
        <a
          href="https://twitter.com/Bayan_101_"
          target="_blank"
          className="mr-2 text-[#26ABBB] text-3xl lg:text-5xl"
          alt=""
        >
          {" "}
          <FaTwitter />
        </a>
        <a
          href="https://www.youtube.com/channel/UC1Kb95HK3fP97UPRknm1dLA"
          target="_blank"
          className="mr-2 text-[#26ABBB] text-3xl lg:text-5xl"
          alt=""
        >
          {" "}
          <AiFillYoutube />
        </a>
        <a
          href="https://www.instagram.com/bian_edu/"
          target="_blank"
          className="mr-2 text-[#26ABBB] text-3xl lg:text-5xl"
          alt=""
        >
          {" "}
          <AiOutlineInstagram />
        </a>
      </div>
      <div
        className=" justify-center items-center flex-col-reverse gap-4 hidden lg:flex"
        id="someRandomID"
      >
        <a
          href="https://www.facebook.com/%D9%85%D9%86%D8%B5%D8%A9-%D8%A8%D9%8A%D8%A7%D9%86-%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%D9%8A%D8%A9-103664719122610/"
          target="_blank"
          className="mr-2 text-[#26ABBB] text-3xl lg:text-5xl"
          alt=""
        >
          {" "}
          <FaFacebookF />
        </a>
        <a
          href="https://twitter.com/Bayan_101_"
          target="_blank"
          className="mr-2 text-[#26ABBB] text-3xl lg:text-5xl"
          alt=""
        >
          {" "}
          <FaTwitter />
        </a>
        <a
          href="https://www.youtube.com/channel/UC1Kb95HK3fP97UPRknm1dLA"
          target="_blank"
          className="mr-2 text-[#26ABBB] text-3xl lg:text-5xl"
          alt=""
        >
          {" "}
          <AiFillYoutube />
        </a>
        <a
          href="https://www.instagram.com/bian_edu/"
          target="_blank"
          className="mr-2 text-[#26ABBB] text-3xl lg:text-5xl"
          alt=""
        >
          {" "}
          <AiOutlineInstagram />
        </a>
      </div>
    </div>
  );
};

export default Social;
