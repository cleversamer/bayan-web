import React from "react";
import { FaWhatsappSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  return (
    <div className="w-full max-h-[400px] border-t-[1px] border-[#d7d5d5] border-solid pt-[80px]">
      <div className="w-[80%] mx-auto flex justify-evenly items-start gap-4">
        <div>
          <h3 className="text-[#26ABBB] text-[12px] md:text-[20px] text-right w-[81px] md:w-fit">
            شروط الاستخدام
          </h3>
          <Link
            to="/privacy"
            className="no-underline block text-black text-right mt-[23px] text-sm md:text-base "
          >
            الخصوصية
          </Link>
          {/* <Link to='/privacy' className='no-underline block text-black text-right mt-[20px] text-sm md:text-base '>اتصل بنا</Link> */}
          <a
            href="https://wa.me/+970567682999"
            target="_blank"
            className="no-underline block text-black text-right mt-[20px] text-sm md:text-base"
          >
            {/* <FaWhatsappSquare size={80} /> */}
            اتصل بنا
          </a>
        </div>
        <div>
          <h3 className="text-[#26ABBB]  text-[12px] md:text-[20px] text-right ">
            {" "}
            من نحن
          </h3>
          <Link
            to="/about"
            className="no-underline block text-black text-right mt-[23px] text-sm md:text-base "
          >
            رسالتنا
          </Link>
          <Link
            to="/about"
            className="no-underline block text-black text-right mt-[20px] text-sm md:text-base "
          >
            رؤيتنا{" "}
          </Link>
        </div>
        {/* <div>
          <h3 className='text-[#26ABBB]  text-[12px] md:text-[20px] text-right '> الرئيسية</h3>
          <Link to='/' className='no-underline block text-black text-right mt-[23px] text-xs md:text-base '>المراحل الدراسية</Link>
          <Link to='/class' className='no-underline block text-black text-right mt-[20px] text-xs md:text-base '  >الصفوف الدراسية </Link>
          <Link to='/material' className='no-underline block text-black text-right mt-[20px] text-xs md:text-base ' >المواد الدراسية  </Link>
        </div> */}
        <img
          src="/assets/ابتدائي.png"
          className="hidden md:block w-[100px]"
          alt=""
        />
      </div>
      <p className="w-fit mx-auto text-[#707070] text-xs md:text-base text-center mt-3">
        كل الحقوق محفوظة. {date.getUTCFullYear()} © منصة بيان التعليمية
      </p>
    </div>
  );
};

export default Footer;
