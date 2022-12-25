/* eslint-disable react/jsx-no-target-blank */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useAuth from "v3/auth/useAuth";
import usersApi from "v3/api/user/users";
import toast from "v3/services/toast";

import Footer from "v3/components/Footer";
import Navbar from "v3/components/Navbar";
import Social from "v3/components/Social";
import WhatsApp from "v3/components/WhatsApp";
import PopupMessage from "v3/components/PopupMessage";
import SubscriptionItem from "../admin/SubscriptionItem";

import { BsPerson } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [userForm, setUserForm] = useState(null);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(
    "/assets/default-avatar.png"
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (user) {
      setUserForm({
        name: user.name,
        email: user.email,
        phone: user.phone.substring(4),
        countryCode: user.phone.substring(0, 4),
        changed: false,
        avatar: null,
        submitting: false,
      });

      if (user.avatarURL) {
        setSelectedPhotoUrl(user.avatarURL);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user.role === "student") {
      usersApi.student
        .getMySubscriptions()
        .then((res) => {
          setSubscriptions(res.data);
        })
        .catch((err) => {
          //
        });
    }
  }, [user.role]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userForm.changed) {
      return;
    }

    setUserForm({ ...userForm, submitting: true });

    const { name, email, phone, countryCode, avatar } = userForm;
    usersApi.common
      .updateProfile({ name, email, phone: countryCode + phone, avatar })
      .then((res) => {
        toast.showSuccess("تم تحديث بياناتك بنجاح");

        if (userForm.email !== user.email) {
          navigate("/verify");
        } else {
          navigate("/");
        }

        const { user: newUser, token } = res.data;
        login(newUser, token);
      })
      .catch((err) => {
        toast.showError(err?.response?.data?.message?.ar || err.message);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .finally(() => {
        setUserForm({ ...userForm, changed: false, submitting: false });
      });
  };

  const handleChange = (key) => (e) => {
    let value = e.target.value;

    if (e.target.files) {
      value = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = () => {
        setSelectedPhotoUrl(reader.result);
      };
    }

    if (key === "phone") {
      const isMaxNumLength =
        (userForm.countryCode === "+965" && userForm.phone.length === 8) ||
        (["+970", "+972"].includes(userForm.countryCode) &&
          userForm.phone.length === 9);

      if (isMaxNumLength && value.length > userForm.phone.length) {
        return;
      }
    }

    const body = { ...userForm, [key]: value, changed: true };
    if (key === "countryCode") {
      body.phone = "";
    }

    setUserForm(body);
  };

  const handleVerifyEmail = () => {
    usersApi.common
      .resendVerificationCode()
      .then((res) => {
        toast.showSuccess(res.data.message.ar);
      })
      .catch((err) => {
        toast.showError(err?.response?.data?.message?.ar || err.message);
      });
  };

  const getUserType = (role) => {
    role = role.toLowerCase();

    switch (role) {
      case "student":
        return "طالب";

      case "teacher":
        return "معلّم";

      case "admin":
        return "آدمن";

      default:
        return "طالب";
    }
  };

  if (!user || !userForm) {
    return null;
  }

  return (
    <>
      <Social />

      <Navbar target="main" />

      <div className="w-full md:w-[80%] mx-auto my-[80px]">
        {userForm.submitting && <PopupMessage message="جاري تحديث بياناتك" />}

        <div className=" w-full flex justify-center items-start flex-wrap flex-row-reverse">
          <div className="w-full md:w-[40%] flex flex-col  items-end justify-center ">
            <div className="w-full md:w-fit flex flex-row-reverse gap-5 justify-end items-center  ">
              <img
                src={selectedPhotoUrl}
                alt=""
                className="w-[150px] h-[150px] object-cover relative rounded-[50%] flex items-center justify-center "
              />

              <label
                htmlFor="avatar"
                className="cursor-pointer px-[20px] py-[5px] text-[16px] text-center text-white bg-[#26ABBB] no-underline rounded-lg"
              >
                تعديل الصورة
                <input
                  id="avatar"
                  type="file"
                  onChange={handleChange("avatar")}
                  accept="image/png image/jpg image/jpeg"
                  className="hidden"
                />
              </label>
            </div>

            <form className="py-[14px]  text-right" onSubmit={handleSubmit}>
              <DetailsGroup>
                <Detail>
                  <DetailValue>
                    {user.verified.email ? "مفعّل" : "غير مفعّل"}
                  </DetailValue>

                  <DetailHeading>: البريد الإلكتروني</DetailHeading>
                </Detail>

                <Detail>
                  <DetailValue>
                    {user.verified.phone ? "مفعّل" : "غير مفعّل"}
                  </DetailValue>

                  <DetailHeading>: رقم الهاتف</DetailHeading>
                </Detail>

                <Detail>
                  <DetailValue>{getUserType(user.role)}</DetailValue>

                  <DetailHeading>: فئة المستخدم</DetailHeading>
                </Detail>

                <Detail>
                  <DetailValue>{user.createdAt.split("T")[0]}</DetailValue>

                  <DetailHeading>: تاريخ الإنضمام</DetailHeading>
                </Detail>

                <Detail>
                  <DetailValue>
                    {new Date(user.lastLogin).toLocaleDateString(
                      "ar-EG-u-nu-latn",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )}
                  </DetailValue>

                  <DetailHeading>: آخر دخول</DetailHeading>
                </Detail>

                <Detail>
                  <DetailValue>
                    {user.authType === "google" ? "جوجل" : "البريد الإلكتروني"}
                  </DetailValue>

                  <DetailHeading>: مُنضم بواسطة</DetailHeading>
                </Detail>
              </DetailsGroup>

              <p className="text-[#26ABBB] text-right p-0 my-[10px] text-[20px] font-extrabold ">
                : الاسم ثلاثي
              </p>

              <div className=" text-gray-400 focus-within:text-gray-600  flex justify-end border-[1px] border-solid border-gray-600 items-center gap-3 px-4 py-2 rounded-lg">
                <input
                  type="text"
                  onChange={handleChange("name")}
                  name="name"
                  value={userForm?.name}
                  className=" rounded-lg focus:outline-none text-right p-0 m-0 "
                />

                <BsPerson size={30} className="" />
              </div>

              <p className="text-[#26ABBB] text-right p-0 my-[10px] text-[20px] font-extrabold ">
                {" "}
                : البريدالالكتروني{" "}
              </p>

              <div className=" text-gray-400 w-100 focus-within:text-gray-600  flex justify-end border-[1px] border-solid border-gray-600 items-center gap-3 px-4 py-2 rounded-lg w-[400px]">
                <input
                  type="email"
                  onChange={handleChange("email")}
                  name="email"
                  value={userForm?.email}
                  className=" rounded-lg    focus:outline-none text-right p-0 m-0 w-full"
                />

                <HiOutlineMail size={30} className="" />
              </div>

              <p className="text-[#26ABBB] text-right p-0 my-[10px] text-[20px] font-extrabold ">
                : رقم الهاتف
              </p>

              <div className="relative text-gray-400 focus-within:text-gray-600  flex justify-end border-[1px] border-solid border-gray-600 items-center gap-3 px-4 py-2 rounded-lg">
                <select
                  className="w-[60px] outline-none cursor-pointer absolute top-1/2 transform -translate-y-1/2 left-3"
                  onChange={handleChange("countryCode")}
                  value={userForm.countryCode}
                >
                  <option value="+965">+965</option>
                  <option value="+970">+970</option>
                  <option value="+972">+972</option>
                </select>

                <input
                  type="text"
                  onChange={handleChange("phone")}
                  name="phone"
                  value={userForm?.phone}
                  className=" rounded-lg    focus:outline-none text-right p-0 m-0 "
                />

                <AiOutlinePhone size={30} className="" />
              </div>

              <div style={{ marginTop: "15px" }}>
                {!user?.verified?.email && (
                  <Link
                    onClick={handleVerifyEmail}
                    to="/verify"
                    className="text-[#26ABBB] text-right p-0 my-[10px] text-[16px] font-extrabold "
                  >
                    تفعيل البريد الإلكتروني
                  </Link>
                )}
              </div>

              <Button disabled={!userForm.changed} blue={userForm.changed}>
                حفظ التعديلات
              </Button>
            </form>
          </div>

          <div className="w-full md:w-[40%] flex flex-col  items-center justify-center text-right mr-[110px]">
            {user?.role === "student" && (
              <>
                <h1 className="text-[#26ABBB] text-center p-0 my-[10px] mb-[50px] text-[30px] font-black ">
                  الباقات المشترك بها
                </h1>

                {user?.subscriptions?.length ? (
                  <h1 className="text-[#26ABBB] w-full text-right p-8 my-[10px] text-[18px] text-center font-bold ">
                    أنت غير مشترك في أيّ باقة
                  </h1>
                ) : (
                  <List>
                    {subscriptions.map((subscription) => (
                      <SubscriptionItem
                        key={subscription._id}
                        adminView={false}
                        subscription={subscription}
                      />
                    ))}
                  </List>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <WhatsApp />
    </>
  );
};

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-height: 430px;
  overflow-y: auto;
  padding-right: 20px;
`;

const DetailsGroup = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  column-gap: 30px;
  margin: 20px 0;
`;

const Detail = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 7px;
`;

const DetailHeading = styled.p`
  font-weight: 700;
  font-size: 15px;
`;

const DetailValue = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const Button = styled.button`
  background-color: ${({ blue, selected }) =>
    blue || selected ? "#26ABBB" : "#888"};
  height: 40px;
  width: 160px;
  min-width: 100px;
  padding: 5px 7px;
  color: #fff;
  border-radius: 4px;
  transition-duration: 176ms;
  margin-top: 10px;

  :active {
    transform: scale(0.97);
  }
`;

export default Profile;
