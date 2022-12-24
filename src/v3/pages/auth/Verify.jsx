import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "v2/auth/useAuth";
import usersApi from "v2/api/user/users";
import toast from "v2/services/toast";

import useCountdown from "v2/hooks/useCountdown";

import PopupMessage from "v2/components/PopupMessage";
import { RiMailCheckLine } from "react-icons/ri";

const Verify = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ code: "", submitting: false });

  const date = new Date();
  date.setTime(date.getTime() + 1000 * 59);
  const [, , minutes, seconds] = useCountdown(date);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, submitting: true });

    const { code } = formData;
    usersApi.common
      .verifyUser(code)
      .then((res) => {
        toast.showSuccess("تم تفعيل بريدك الإلكتروني بنجاح");
        setUser(res.data);
        navigate("/");
      })
      .catch((err) => {
        toast.showError(err?.response?.data?.message?.ar || err.message);
      })
      .finally(() => {
        setFormData({ code: "", submitting: false });
      });
  };

  const handleChange = (key) => (e) =>
    setFormData({ ...formData, [key]: e.target.value });

  return (
    <div className="flex items-center justify-between h-screen w-[100%] ">
      {formData.submitting && <PopupMessage />}

      <div className="px-6 hidden lg:w-[40%] h-full bg-[#26ABBB]  lg:flex  flex-col justify-center items-center relative">
        <img
          src="/assets/Group 600.png"
          alt="bgimg"
          className="absolute w-full bottom-0 right-0  object-cover"
        />

        <p className="text-right text-white text-5xl w-fit mx-auto ">
          {" "}
          إنطلق مع بيان نحو القمة{" "}
        </p>

        <p className="text-right text-white text-4xl w-fit mx-auto">التحقق </p>

        <img
          src="/assets/logo-lg.png"
          alt="logo"
          className="w-[245.69px] bg-white rounded-lg px-6 py-4"
        />
      </div>

      <div className=" w-full lg:w-[60%] h-full  flex flex-col items-center justify-center">
        <Link to="/">
          <div className="flex items-center justify-center w-[100%]">
            <img src="/assets/logo-md.png" alt="logo" className="w-[65.69px]" />
          </div>
        </Link>

        <div className="w-full md:w-[552px] mx-auto mt-[28px] shadow-xl rounded-md">
          <h2 className="w-fit mx-auto text-[#26ABBB] ">
            {" "}
            تحقق عن طريق الإيميل{" "}
          </h2>

          <form className="py-[72px] px-[72px]" onSubmit={handleSubmit}>
            <p className="text-[#363535] text-right p-0 my-[10px]">
              يرجى إدخال الكود الذي تم إرساله إلى بريدك الإلكتروني
            </p>

            <label
              htmlFor="code"
              className="relative text-gray-400 focus-within:text-gray-600 block"
            >
              <RiMailCheckLine className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-3" />

              <input
                onChange={handleChange("code")}
                value={formData.code}
                type="number"
                name="code"
                id="code"
                className="w-full rounded-lg py-2 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
              />
            </label>

            <div className="mt-2 text-[#26ABBB] flex justify-end">
              <p>{`${minutes}:${seconds}`}</p>

              <p className="ml-4">إعادة إرسال</p>
            </div>

            <button className="bg-[#26ABBB] w-full rounded-md p-2 text-white ">
              تحقق{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify;
