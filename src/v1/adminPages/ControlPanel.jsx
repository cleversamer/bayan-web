import { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { BiSearchAlt2 } from "react-icons/bi";
import PackagesList from "./PackagesList";

const ControlPanel = ({ children }) => {
  const [resultUser, setResultUser] = useState(null);
  const [search, setSearch] = useState({ term: "", role: "teacher" });
  const [userInfo, setUserInfo] = useState({
    name: resultUser?.name || "",
    email: resultUser?.email || "",
    phone: resultUser?.phone || "",
    password: resultUser?.password || "",
  });

  const handleSearchChange = (key, value) => (e) =>
    setSearch({ ...search, [key]: value || e.target.value });

  const handleUserInfoChange = (key) => (e) =>
    setUserInfo({ ...userInfo, [key]: e.target.value });

  const handleSearch = (e) => {
    try {
      e.preventDefault();

      // Call the server and get the resulting user...

      clearSearch();
    } catch (err) {
      // Showing toast with the error
    }
  };

  const handleSaveChanges = (e) => {
    try {
      e.preventDefault();

      // Call the server and get the resulting user...
    } catch (err) {
      // Showing toast with the error
    }
  };

  const clearSearch = (withUser = false) => {
    setUserInfo({
      name: "",
      email: "",
      phone: "",
      password: "",
    });

    setSearch({ ...search, term: "" });

    if (withUser) {
      setResultUser(null);
    }
  };

  return (
    <Container>
      <Navbar />

      <Content>
        <Header>
          <Avatar>
            <Button blue>تعديل الصورة</Button>
            <AvatarPicture
              src={resultUser?.avatarURL || "/default-avatar.png"}
            />
          </Avatar>
        </Header>

        <Body>
          <Search onSubmit={handleSearch}>
            <BtnGroup>
              <Button
                selected={search.role === "teacher"}
                onClick={handleSearchChange("role", "teacher")}
              >
                معلم
              </Button>

              <Button
                selected={search.role === "student"}
                onClick={handleSearchChange("role", "student")}
              >
                طالب
              </Button>
            </BtnGroup>

            <SearchBar>
              <SearchInput
                placeholder="...ابحث"
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
              <InputGroup>
                <Label htmlFor="name">الإسم ثلاثي</Label>
                <Text
                  id="name"
                  placeholder="الإسم ثلاثي"
                  value={userInfo.name}
                  onChange={handleUserInfoChange("name")}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Text
                  id="email"
                  role="email"
                  placeholder="البريد الإلكتروني"
                  value={userInfo.email}
                  onChange={handleUserInfoChange("email")}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="phone">رقم الجوال</Label>
                <Text
                  id="phone"
                  role="number"
                  placeholder="رقم الجوال"
                  value={userInfo.phone}
                  onChange={handleUserInfoChange("phone")}
                />
              </InputGroup>

              <InputGroup>
                <Label htmlFor="password">كلمة المرور</Label>
                <Text
                  id="password"
                  role="password"
                  placeholder="كلمة المرور"
                  value={userInfo.password}
                  onChange={handleUserInfoChange("password")}
                />
              </InputGroup>

              <BtnGroup>
                <Button blue onClick={() => clearSearch(true)}>
                  إلغاء
                </Button>

                <Button blue onClick={handleSaveChanges}>
                  حفظ التغييرات
                </Button>
              </BtnGroup>

              <BtnMessage blue>
                <Image src="/whatsapp.png" alt="whatsapp logo" />
                {search.role === "student" ? "مراسلة الطالب" : "مراسلة المعلم"}
              </BtnMessage>
            </ResultForm>

            <PackagesList />
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

const AvatarPicture = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 50%;
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

const BtnMessage = styled(Button)`
  margin-top: 15px;
  width: 150px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
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

const InputGroup = styled.div`
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
