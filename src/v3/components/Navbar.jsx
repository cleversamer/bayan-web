/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../auth/useAuth";
import Dropdown from "./Dropdown";

import { FaBars } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [active, setActive] = useState();
  const [navbar, setNavbar] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const el = document.getElementById(props.target);
    setActive(el?.id);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-full md:w-[90%] mx-auto flex flex-col items-center justify-center">
      <nav className="w-full bg-white px-3 hidden md:block pt-2">
        <div className="justify-between  mx-auto  md:items-center md:flex px-7 md:px-0">
          <Link to="/" className="order-last md:w-[10%]">
            <img
              src="/assets/logo-min.png"
              alt="logo"
              className="w-[50px] order-last"
            />
          </Link>

          <div className="flex w-fit md:w-[60%] justify-start  items-center">
            <div className={`flex-1 justify-self-center items-center`}>
              <ul className="items-center justify-center flex space-x-4 lg:space-x-[7px] m-0 ">
                <li>
                  {user?.role === "admin" ? (
                    <Link
                      to="/admin"
                      className={`bg-white py-2 text-[15px] lg:text-[17px] xl:text-[21px] lg:px-2  no-underline text-${
                        active === "mySubjects" ? "[#26ABBB]" : "black"
                      }`}
                      id="controlPanel"
                    >
                      {" "}
                      لوحة التحكم{" "}
                    </Link>
                  ) : (
                    <Dropdown />
                  )}
                </li>

                <li>
                  <Link
                    to="/instructions"
                    className={`bg-white py-2 text-[15px] lg:text-[17px] xl:text-[21px] lg:px-2  no-underline text-${
                      active === "instructions" ? "[#26ABBB]" : "black"
                    }`}
                    id="instructions"
                  >
                    {" "}
                    تعليمات
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className={`bg-white py-2 text-[15px] lg:text-[17px] xl:text-[21px] lg:px-2  no-underline text-${
                      active === "about" ? "[#26ABBB]" : "black"
                    }`}
                    id="about"
                  >
                    من نحن
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className={`bg-white py-2 text-[15px] lg:text-[17px] xl:text-[21px] lg:px-2  no-underline text-${
                      active === "main" ? "[#26ABBB]" : "black"
                    }`}
                    id="main"
                  >
                    الرئيسية
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className=" justify-center items-center order-first flex flex-1">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="bg-white     rounded-3xl py-2   md:px-4 mr-2 border-[1px] border-[#24343F] no-underline text-black text-[12px] lg:text-base text-center"
                >
                  الصفحة الشخصية{" "}
                </Link>

                <div
                  onClick={handleLogout}
                  className="bg-[#26ABBB]        rounded-3xl py-2  px-2 lg:px-4 border-[#24343F] no-underline text-white text-[12px] lg:text-base cursor-pointer text-center"
                >
                  تسجيل الخروج{" "}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="bg-white     rounded-3xl py-2    mr-2 border-[1px] border-[#24343F] no-underline text-black text-[12px] lg:text-[14px] px-4"
                >
                  دخول
                </Link>

                <Link
                  to="/signup"
                  className="bg-[#26ABBB] rounded-3xl py-2    lg:px-4 border-[#24343F] no-underline text-white text-[12px] lg:text-base px-3"
                >
                  {" "}
                  سجل الآن{" "}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <nav className="w-full bg-white px-3   block  md:hidden">
        <div className="justify-between  mx-auto  md:items-center ">
          <div className="order-last md:w-[10%]">
            <div className="flex items-center justify-between py-2">
              <div className="order-first flex gap-3">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? <IoExitOutline size={25} /> : <FaBars size={25} />}
                </button>

                <div className="flex justify-center items-center  md:hidden">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="bg-white     rounded-3xl py-2   md:px-4 mr-2 border-[1px] border-[#24343F] no-underline text-black text-[12px] lg:text-base text-center"
                      >
                        الصفحة الشخصية{" "}
                      </Link>

                      <div
                        onClick={logout}
                        className="bg-[#26ABBB]        rounded-3xl py-2  px-2 lg:px-4 border-[#24343F] no-underline text-white text-[12px] lg:text-base cursor-pointer text-center"
                      >
                        تسجيل الخروج{" "}
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        className="bg-white     rounded-3xl py-2   px-4 mr-2 border-[1px] border-[#24343F] no-underline text-black text-[12px] lg:text-base"
                      >
                        دخول
                      </Link>

                      <Link
                        to="/signup"
                        className="bg-[#26ABBB] rounded-3xl py-2   px-2 lg:px-4 border-[#24343F] no-underline text-white text-[12px] lg:text-base"
                      >
                        {" "}
                        سجل الآن{" "}
                      </Link>
                    </>
                  )}
                </div>
              </div>

              <Link to="/" className="order-last md:w-[10%]">
                <img
                  src="/assets/logo.png"
                  alt=""
                  className="w-[50px] order-last"
                />
              </Link>
            </div>
          </div>

          <div className="flex  justify-start absolute bg-white w-full">
            <div
              className={`flex-1 justify-self-center items-center ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:space-x-6 ">
                <li>
                  {user?.role === "admin" ? (
                    <Link
                      to="/admin/addlevel"
                      className={`bg-white py-2 text-[15px] lg:text-[17px] xl:text-[21px] lg:px-2  no-underline text-${
                        active === "mySubjects" ? "[#26ABBB]" : "black"
                      }`}
                      id="mySubjects"
                    >
                      {" "}
                      لوحة التحكم{" "}
                    </Link>
                  ) : (
                    <Link
                      to="/mySubjects"
                      className={`bg-white py-2 text-[15px] lg:text-[17px] xl:text-[21px] lg:px-2  no-underline text-${
                        active === "mySubjects" ? "[#26ABBB]" : "black"
                      }`}
                      id="mySubjects"
                    >
                      {" "}
                      موادي{" "}
                    </Link>
                  )}{" "}
                </li>

                <li>
                  <Link
                    to="/instructions"
                    className={`bg-white py-2 text-[15px] lg:text-[17px] xl:text-[21px] lg:px-2  no-underline text-${
                      active === "instructions" ? "[#26ABBB]" : "black"
                    }`}
                    id="instructions"
                  >
                    {" "}
                    تعليمات
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className={`bg-white py-2 text-sm  mr-1  no-underline text-${
                      active === "about" ? "[#26ABBB]" : "black"
                    }`}
                    id="about"
                  >
                    من نحن
                  </Link>
                </li>

                <li>
                  <Link
                    to="/"
                    className={`bg-white py-2 text-sm  mr-1  no-underline text-${
                      active === "main" ? "[#26ABBB]" : "black"
                    }`}
                    id="main"
                  >
                    الرئيسية
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
