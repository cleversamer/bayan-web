/* eslint-disable react/jsx-no-target-blank */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import usersApi from "v3/api/user/users";
import toast from "v3/services/toast";

import Navbar from "v3/components/Navbar";
import Subscriptions from "./Subscriptions";
import PopupMessage from "v3/components/PopupMessage";

import { BiSearchAlt2 } from "react-icons/bi";
import { HiOutlineRefresh } from "react-icons/hi";
import { MdClear } from "react-icons/md";

const ControlPanel = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ term: "", role: "student" });
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState("");
  const [userForm, setUserForm] = useState({
    user: null,
    name: "",
    email: "",
    phone: "",
    countryCode: "+965",
    password: "",
    avatar: null,
    avatarURL: "",
    submitting: false,
    version: 0,
  });

  const handleSearchChange = (key, value) => (e) =>
    setSearch({ ...search, [key]: value || e.target.value });

  const handleRoleChange = (value) => () => {
    setSearch({ term: "", role: value });
    setUserForm({
      user: null,
      name: "",
      email: "",
      phone: "",
      countryCode: "+965",
      password: "",
      avatar: null,
      avatarURL: "",
      submitting: false,
      version: 0,
    });
  };

  const handleUserFormChange = (key) => (e) => {
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

    const body = { ...userForm, [key]: value };
    if (key === "countryCode") {
      body.phone = "";
    }

    setUserForm(body);
  };

  const handleSearch = (e, isUpdate = false) => {
    e.preventDefault();

    const searchForbidden =
      !search.term ||
      userForm?.user?.email === search.term ||
      userForm?.user?.phone === search.term;

    if (!isUpdate && searchForbidden) {
      return;
    }

    const term = search.term;
    if (!isUpdate) {
      setSearch({ ...search, term: "...جاري البحث" });
    }

    const _searchTerm = isUpdate
      ? userForm.user.phone || userForm.user.email
      : search.term;

    usersApi.admin
      .findUser(search.role, _searchTerm)
      .then((res) => {
        const processTitle = isUpdate ? "تحديث بيانات" : "العثور على";
        const message =
          search.role === "student"
            ? `تم ${processTitle} الطّالب`
            : `تم ${processTitle} المعلّم`;

        toast.showSuccess(message);
        const user = res.data;

        setUserForm({
          user,
          name: user.name,
          email: user.email,
          phone: user.phone.substring(4),
          countryCode: user.phone.substring(0, 4),
          password: "",
          avatar: null,
          avatarURL: user.avatarURL,
          submitting: false,
          version: userForm.version + 1,
        });
      })
      .catch((err) => {
        toast.showError(err?.response?.data?.message?.ar || err.message);
        clearSearch();
      })
      .finally(() => {
        if (!isUpdate) {
          setSearch({ ...search, term });
        }
      });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (!userForm.user) {
      return;
    }

    const body = {};
    for (let key in userForm) {
      if (key === "user") {
        continue;
      }

      const updated = userForm.user[key] !== userForm[key];
      if (updated && userForm[key]) {
        if (key === "countryCode" || key === "phone") {
          const phoneEqual =
            `${userForm.countryCode}${userForm.phone}` === userForm.user.phone;

          if (!phoneEqual) {
            body.phone = userForm.countryCode + userForm.phone;
          }
        } else {
          body[key] = userForm[key];
        }
      }
    }

    if (!Object.keys(body).length) {
      return;
    }

    setUserForm({ ...userForm, submitting: true });

    usersApi.admin
      .updateUserProfile(userForm.user._id, body)
      .then((res) => {
        toast.showSuccess("تم تحديث البيانات بنجاح");
        setUserForm({ ...userForm, user: res.data, submitting: false });
      })
      .catch((err) => {
        toast.showError(err?.response?.data?.message?.ar || err.message);
        setUserForm({ ...userForm, submitting: false });
      });
  };

  const handleVerifyUser = () => {
    usersApi.admin
      .verifyUserByAdmin(userForm.user._id)
      .then((res) => {
        const role = search.role === "student" ? "طّالب" : "معلّم";
        toast.showSuccess(`تم تفعيل رقم الهاتف والبريد الإلكتروني لل${role}`);
        setUserForm({ ...userForm, user: res.data });
      })
      .catch((err) => {
        toast.showError(err?.response?.data?.message?.ar || err.message);
      });
  };

  const handleChangeUserRole = () => {
    const role = search.role === "student" ? "teacher" : "student";

    const preRoleDisplayName = search.role === "student" ? "طّالب" : "معلّم";
    const newRoleDisplayName = search.role === "student" ? "معلّم" : "طالب";

    usersApi.admin.updateUserRole(userForm.user._id, role).then((res) => {
      toast.showSuccess(
        `تم تحويل ال${preRoleDisplayName} إلى ${newRoleDisplayName} بنجاح`
      );
      setSearch({ ...search, role });
      setUserForm({ ...userForm, user: res.data });
    });
  };

  const clearSearch = () => {
    setSearch({ term: "", role: search.role });

    setSelectedPhotoUrl("");

    setUserForm({
      user: null,
      name: "",
      email: "",
      phone: "",
      password: "",
      avatar: null,
      avatarURL: "",
      submitting: false,
      version: 0,
    });
  };

  return (
    <Container>
      {userForm.submitting && (
        <PopupMessage message="جاري تحديث بيانات المستخدم" />
      )}

      <Navbar target="controlPanel" />

      <BtnNavigate blue onClick={() => navigate("/admin/addLevel")}>
        لوحة الإضافة
      </BtnNavigate>

      <Content>
        <Header>
          <Avatar>
            <label
              htmlFor="avatar"
              className="cursor-pointer px-[20px] py-[5px] text-[16px] text-center text-white bg-[#26ABBB] no-underline rounded-lg"
            >
              تعديل الصورة
              <input
                id="avatar"
                type="file"
                onChange={handleUserFormChange("avatar")}
                accept="image/png image/jpg image/jpeg"
                className="hidden"
                disabled={!userForm.user}
              />
            </label>

            <AvatarPicture
              src={
                selectedPhotoUrl ||
                userForm.avatarURL ||
                "/assets/default-avatar.png"
              }
            />
          </Avatar>
        </Header>

        <Body>
          <Search onSubmit={handleSearch}>
            <BtnGroup>
              <Button
                selected={search.role === "teacher"}
                onClick={handleRoleChange("teacher")}
                type="button"
              >
                معلّم
              </Button>

              <Button
                selected={search.role === "student"}
                onClick={handleRoleChange("student")}
                type="button"
              >
                طالب
              </Button>
            </BtnGroup>

            <SearchBar>
              {search.term && (
                <MdClear
                  size={16}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSearch({ ...search, term: "" })}
                />
              )}

              <SearchInput
                placeholder="البريد الإلكتروني أو رقم الهاتف"
                value={search.term}
                onChange={handleSearchChange("term")}
              />

              <BiSearchAlt2
                size={20}
                style={{ cursor: "pointer" }}
                onClick={handleSearch}
              />
            </SearchBar>
          </Search>

          <Result>
            <ResultForm>
              {userForm.user && (
                <>
                  <BtnRefreshUser onClick={(e) => handleSearch(e, true)}>
                    تحديث بيانات{" "}
                    {search.role === "student" ? "الطّالب" : "المعلّم"}
                    <HiOutlineRefresh />
                  </BtnRefreshUser>

                  <DetailsGroup>
                    <Detail>
                      <DetailValue>
                        {userForm.user.verified.email ? "مفعّل" : "غير مفعّل"}
                      </DetailValue>

                      <DetailHeading>: البريد الإلكتروني</DetailHeading>
                    </Detail>

                    <Detail>
                      <DetailValue>
                        {userForm.user.verified.phone ? "مفعّل" : "غير مفعّل"}
                      </DetailValue>

                      <DetailHeading>: رقم الهاتف</DetailHeading>
                    </Detail>

                    <Detail>
                      <DetailValue>
                        {userForm.user?.role === "student" ? "طالب" : "معلّم"}
                      </DetailValue>

                      <DetailHeading>: فئة المستخدم</DetailHeading>
                    </Detail>

                    <Detail>
                      <DetailValue>
                        {userForm.user?.createdAt.split("T")[0]}
                      </DetailValue>

                      <DetailHeading>: تاريخ الإنضمام</DetailHeading>
                    </Detail>

                    <Detail>
                      <DetailValue>
                        {new Date(userForm.user?.lastLogin).toLocaleDateString(
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
                        {userForm.user.authType === "google"
                          ? "جوجل"
                          : "البريد الإلكتروني"}
                      </DetailValue>

                      <DetailHeading>: إنضمّ بواسطة</DetailHeading>
                    </Detail>
                  </DetailsGroup>
                </>
              )}

              <InputGroup>
                <Label htmlFor="name">الإسم ثلاثي</Label>
                <Text
                  disabled={!userForm.user}
                  id="name"
                  placeholder="الإسم ثلاثي"
                  value={userForm.name || ""}
                  onChange={handleUserFormChange("name")}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Text
                  disabled={!userForm.user}
                  id="email"
                  role="email"
                  placeholder="البريد الإلكتروني"
                  value={userForm.email || ""}
                  onChange={handleUserFormChange("email")}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Text
                  disabled={!userForm.user}
                  id="phone"
                  role="number"
                  placeholder="رقم الهاتف"
                  value={userForm.phone || ""}
                  onChange={handleUserFormChange("phone")}
                />
                <select
                  disabled={!userForm.user}
                  className="w-[60px] outline-none cursor-pointer absolute top-[46px] transform -translate-y-1/2 left-3"
                  onChange={handleUserFormChange("countryCode")}
                  value={userForm.countryCode || ""}
                >
                  <option value="+965">+965</option>
                  <option value="+970">+970</option>
                  <option value="+972">+972</option>
                </select>
              </InputGroup>

              <InputGroup>
                <Label htmlFor="password">كلمة المرور</Label>
                <Text
                  disabled={!userForm.user}
                  id="password"
                  role="password"
                  placeholder="كلمة المرور"
                  value={userForm.password || ""}
                  onChange={handleUserFormChange("password")}
                />
              </InputGroup>

              <InputGroup>
                {userForm.user && (
                  <BtnGroup>
                    <Button blue onClick={handleChangeUserRole}>
                      تحويل إلى {search.role === "student" ? "معلّم" : "طالب"}
                    </Button>

                    <Button
                      blue={
                        !userForm.user.verified.email ||
                        !userForm.user.verified.phone
                      }
                      disabled={
                        userForm.user.verified.email &&
                        userForm.user.verified.phone
                      }
                      onClick={handleVerifyUser}
                    >
                      تفعيل {search.role === "student" ? "الطّالب" : "المعلّم"}
                    </Button>
                  </BtnGroup>
                )}

                <BtnGroup>
                  <Button blue onClick={clearSearch}>
                    إلغاء
                  </Button>

                  <Button
                    blue={userForm.user}
                    onClick={handleSaveChanges}
                    disabled={!userForm.user}
                  >
                    حفظ التغييرات
                  </Button>
                </BtnGroup>
              </InputGroup>

              {userForm.user && (
                <BtnMessage blue>
                  <a
                    href={`https://wa.me/${userForm.countryCode}${userForm.phone}`}
                    target="_blank"
                  >
                    <Image src="/assets/whatsapp.png" alt="whatsapp logo" />
                    {search.role === "student"
                      ? "مراسلة الطّالب"
                      : "مراسلة المعلّم"}
                  </a>
                </BtnMessage>
              )}
            </ResultForm>

            {userForm.user && userForm.user.role === "student" && (
              <Subscriptions
                userId={userForm.user._id}
                version={userForm.version}
              />
            )}
          </Result>
        </Body>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 40px;
`;

const Content = styled.div`
  margin-top: 40px;
  width: 90%;
  display: flex;
  gap: 30px;
  flex-direction: column;
  align-items: flex-end;
`;

const Header = styled.div``;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  button {
    width: 120px;
  }
`;

const AvatarPicture = styled.div`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 50%;
  background-image: ${({ src }) => `url(${src})`};
  background-position: center;
  background-size: contain;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: flex-end;
`;

const Search = styled.form`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  gap: 10px;
`;

const Button = styled.button`
  background-color: ${({ blue, selected }) =>
    blue || selected ? "#26ABBB" : "#888"};
  height: fit-content;
  width: fit-content;
  min-width: 100px;
  padding: 5px 7px;
  color: #fff;
  border-radius: 4px;
  transition-duration: 176ms;

  :active {
    transform: scale(0.97);
  }
`;

const BtnNavigate = styled(Button)`
  margin-top: 30px;
  margin-left: 80%;
  width: 120px;
`;

const BtnMessage = styled(Button)`
  margin-top: -10px;

  a {
    width: 150px;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;

    color: inherit;
    text-decoration: none;
  }
`;

const Image = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  align-items: center;
  border: 2px solid rgba(112, 112, 112, 0.188);
  border-radius: 5px;
  width: 400px;
  padding: 5px 10px;
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  text-align: right;
  flex: 1;
  font-size: 15px;
`;

const Result = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin-top: 20px;
  border: 1.9px solid #707070;
  border-radius: 5px;
  padding: 20px;
`;

const ResultForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BtnRefreshUser = styled.p`
  color: #26abbb;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  transition-duration: 167ms;
  align-self: flex-end;
  margin-top: -10px;

  > svg {
    font-size: 20px;
  }

  :hover {
    transform: scale(1.03);
  }

  :active {
    transform: scale(0.97);
  }
`;

const DetailsGroup = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  column-gap: 30px;
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

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 7px;
  margin-bottom: 25px;
`;

const Label = styled.label`
  color: #303030;
  font-size: 14px;
  margin-right: 10px;
  cursor: pointer;
`;

const Text = styled.input`
  color: #303030;
  outline: none;
  border: none;
  text-align: right;
  flex: 1;
  font-size: 15px;
  border: 2px solid rgba(112, 112, 112, 0.188);
  padding: 5px 10px;
  border-radius: 5px;
  width: 400px;
`;

export default ControlPanel;
