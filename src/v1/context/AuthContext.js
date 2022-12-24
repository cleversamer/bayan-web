import { signInWithPopup } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Cookies from "js-cookie";
import { auth, provider } from "../firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [levels, setLevels] = useState([]);
  const [grads, setGrads] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [material, setMaterial] = useState([]);
  const [packages, setPackages] = useState([]);
  const [units, setUnits] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const baseUrl = "http://191.101.3.193:4000/";

  // --------------------------------------------------------------------------------------Authotication

  // signUp
  async function SignUp(email, password, name, phone, cleaner = () => {}) {
    const obj = {
      email: email,
      password: password,
      name: name,
      phone: phone,
      authType: "email",
    };
    await api
      .post("/auth/register", obj)
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        // setUser(JSON.stringify(response.data.user))
        Cookies.set("authType", response.data.user.authType);
        Cookies.set("avatarURL", response.data.user.avatarURL);
        Cookies.set("email", response.data.user.email);
        Cookies.set("name", response.data.user.name);
        Cookies.set("phone", response.data.user.phone);
        Cookies.set("role", response.data.user.role);
        Cookies.set(
          "subscriptions",
          JSON.stringify(response.data.subscriptions)
        );
        Cookies.set("verified", response.data.user.verified);
        Cookies.set("_id", response.data.user._id);
        setErrorMessage("");
        navigate("/verify");
      })
      .catch((e) => {
        setErrorMessage(e.response.data.message.ar);
      })
      .finally(() => cleaner());
  }
  // signIn
  async function LogIn(emailOrPhone, password, checked, cleaner = () => {}) {
    const obj = {
      emailOrPhone: emailOrPhone,
      password: password,
      authType: "email",
    };
    await api
      .post("/auth/login", obj)
      .then((response) => {
        // console.log(response.data.token)
        if (checked)
          localStorage.setItem("token", JSON.stringify(response.data.token));
        // setUser(JSON.stringify(response.data.user))
        Cookies.set("authType", response.data.user.authType);
        Cookies.set("avatarURL", response.data.user.avatarURL);
        Cookies.set("email", response.data.user.email);
        Cookies.set("name", response.data.user.name);
        Cookies.set("phone", response.data.user.phone);
        Cookies.set("role", response.data.user.role);
        Cookies.set(
          "subscriptions",
          JSON.stringify(response.data.subscriptions)
        );
        Cookies.set("verified", response.data.user.verified);
        Cookies.set("_id", response.data.user._id);
        // console0.log(response.data.user)
        setErrorMessage("");
        navigate("/");
      })
      .catch((e) => setErrorMessage(e.response.data.message.ar))
      .finally(() => cleaner());
  }

  // Verify
  function Verify(code, cleaner = () => {}) {
    const obj = {
      code: code,
    };
    api
      .post("/users/verify", obj, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((e) => {
        setErrorMessage("");
        navigate("/");
      })
      .catch((e) => setErrorMessage(e.response.data.message.ar))
      .finally(() => cleaner());
  }

  // Googel Auth
  async function GoogleTokenProvider(phone) {
    signInWithPopup(auth, provider).then((res) => {
      // console.log(res)
      SignInWithGoogle(res.user.accessToken, phone);
    });
  }
  async function SignInWithGoogle(googleToken, phone) {
    const obj = {
      googleToken: googleToken,
      authType: "google",
      phone: phone,
    };
    await api
      .post("/auth/register", obj)
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        // setUser(JSON.stringify(response.data.user))
        Cookies.set("authType", response.data.user.authType);
        Cookies.set("avatarURL", response.data.user.avatarURL);
        Cookies.set("email", response.data.user.email);
        Cookies.set("name", response.data.user.name);
        Cookies.set("phone", response.data.user.phone);
        Cookies.set("role", response.data.user.role);
        Cookies.set(
          "subscriptions",
          JSON.stringify(response.data.subscriptions)
        );
        Cookies.set("verified", response.data.user.verified);
        Cookies.set("_id", response.data.user._id);
        setErrorMessage("");
        navigate("/");
      })
      .catch((e) => setErrorMessage(e.response.data.message.ar));
  }
  async function GoogleTokenProviderLogIn(cleaner = () => {}) {
    signInWithPopup(auth, provider).then((res) => {
      // console.log(res)
      SignInWithGoogleLogIn(res.user.accessToken);
      cleaner();
    });
  }
  async function SignInWithGoogleLogIn(googleToken) {
    const obj = {
      googleToken: googleToken,
      authType: "google",
    };
    await api
      .post("/auth/login", obj)
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        // setUser(JSON.stringify(response.data.user))
        Cookies.set("authType", response.data.user.authType);
        Cookies.set("avatarURL", response.data.user.avatarURL);
        Cookies.set("email", response.data.user.email);
        Cookies.set("name", response.data.user.name);
        Cookies.set("phone", response.data.user.phone);
        Cookies.set("role", response.data.user.role);
        Cookies.set(
          "subscriptions",
          JSON.stringify(response.data.subscriptions)
        );
        Cookies.set("verified", response.data.user.verified);
        Cookies.set("_id", response.data.user._id);
        // console.log(response.data.user)
        setErrorMessage("");
        navigate("/");
      })
      .catch((e) => setErrorMessage(e.response.data.message.ar));
  }
  // LogOut
  function LogOut() {
    // setUser(undefined)
    Cookies.remove("authType");
    Cookies.remove("avatarURL");
    Cookies.remove("email");
    Cookies.remove("name");
    Cookies.remove("phone");
    Cookies.remove("role");
    Cookies.remove("subscriptions");
    Cookies.remove("verified");
    Cookies.remove("_id");
    // Cookies.set("authType", undefined)
    // Cookies.set("avatarURL", undefined)
    // Cookies.set("email", undefined)
    // Cookies.set("name", undefined)
    // Cookies.set("phone", undefined)
    // Cookies.set("role", undefined)
    // Cookies.set("subscriptions", undefined)
    // Cookies.set("verified", undefined)
    // Cookies.set("_id", undefined)
    localStorage.removeItem("token");
    navigate("/");
  }
  // Is Auth
  function Isauth() {
    api
      .get("/users/isauth", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((response) => {
        console.log("in response auth", response);
        Cookies.set("authType", response.data.user?.authType);
        Cookies.set("avatarURL", response.data.user?.avatarURL);
        Cookies.set("email", response.data.user?.email);
        Cookies.set("name", response.data.user?.name);
        Cookies.set("phone", response.data.user?.phone);
        Cookies.set("role", response.data.user?.role);
        Cookies.set(
          "subscriptions",
          JSON.stringify(response.data.subscriptions)
        );
        Cookies.set("verified", response.data.user?.verified);
        Cookies.set("_id", response.data.user?._id);
        setErrorMessage("");
      })
      .catch((error) => {
        console.log("in catch auth", error);
        localStorage.removeItem("token");
        LogOut();
      });
  }

  // --------------------------------------------------------------------------------------Content
  // GetLevels
  function GetLevels() {
    try {
      api.get("/levels").then((res) => {
        setLevels([]);
        setLevels(res.data);
      });
    } catch (error) {
      // console.log(error)
    }
  }
  // GetGrads
  function GetGrads(levelId) {
    api.get(`/grades/?levelId=${levelId}`).then((res) => {
      setGrads([]);
      setGrads(res.data);
    });
    // .catch(e => console.log(e.response.data.message.ar))
  }
  // GetSeasons
  function GetSeasons(classId) {
    api
      .get(`/seasons/?gradeId=${classId}`)
      .then((res) => {
        setSeasons([]);
        setSeasons(res.data);
      })
      .catch(
        (e) => {}
        // console.log(e.response.data.message.ar)
      );
  }
  // GetMaterial
  function GetMaterial(seasonId) {
    try {
      api
        .get(`/subjects/?seasonId=${seasonId}`)
        .then((res) => {
          setMaterial([]);
          setMaterial(res.data);
        })
        .catch((e) => {});
      // .catch(e => console.log(e.response.data.message.ar))
    } catch (error) {
      setUnits([]);
    }
  }
  // GetPackage
  function GetPackage(gradId) {
    try {
      api.get(`/packages/?gradeId=${gradId}`).then((res) => {
        // console.log(res.data)
        setPackages([]);
        setPackages(res.data);
      });
      // .catch(e => console.log(e.response.data.message.ar))
    } catch (error) {
      setPackages([]);
    }
  }
  // Subscribe
  function Subscribe(packageId, subjects) {
    const obj = {
      packageId: packageId,
      subjects: subjects,
    };
    api
      .post("/users/subscriptions", obj, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        setErrorMessage("");
        navigate("/");
      })
      .catch((e) => setErrorMessage(e.response.data.message.ar));
  }
  // GetUnits
  function GetUnits(subjectId) {
    try {
      api.get(`/units/?subjectId=${subjectId}`).then((res) => {
        setUnits([]);
        setUnits(res.data);
      });
      // .catch(e => console.log(e.response.data.message.ar))
    } catch (error) {
      setUnits([]);
    }
  }
  // GetLesson
  function GetLesson(unitId) {
    try {
      api.get(`/lessons/?unitId=${unitId}`).then((res) => {
        setLessons([]);
        setLessons(res.data);
      });
      // .catch(e => console.log(e.response.data.message.ar))
    } catch (error) {
      setLessons([]);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        SignUp,
        LogIn,
        LogOut,
        user,
        Isauth,
        setUser,
        GoogleTokenProvider,
        GoogleTokenProviderLogIn,
        setGrads,
        GetLevels,
        levels,
        GetGrads,
        grads,
        baseUrl,
        GetSeasons,
        seasons,
        GetMaterial,
        material,
        errorMessage,
        setErrorMessage,
        GetUnits,
        units,
        setUnits,
        GetLesson,
        lessons,
        setLessons,
        packages,
        GetPackage,
        setSelectedLesson,
        selectedLesson,
        Verify,
        Subscribe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
