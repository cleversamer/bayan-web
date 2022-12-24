import axios from "axios";
import Cookies from "js-cookie";
const baseUrl = "http://191.101.3.193:4000/api/";

export const addLevel = (title, file, disableFun = () => {}) => {
  let data = new FormData();
  data.append("title", title);
  data.append("photo", file);
  axios({
    method: "post",
    url: `${baseUrl}/levels`,
    data: data,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function (res) {
      Cookies.set("adminMessage", "تم الاضافة بنجاح ");
    })
    .catch(function (res) {
      Cookies.set("adminMessage", res.response.data.message.ar);
    })
    .finally(() => disableFun());
};

export const addClass = (levelId, number, file, disableFun = () => {}) => {
  let data = new FormData();
  data.append("levelId", levelId);
  data.append("number", number);
  data.append("photo", file);
  axios({
    method: "post",
    url: `${baseUrl}/grades`,
    data: data,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function (response) {
      Cookies.set("adminMessage", "تم الاضافة بنجاح ");
    })
    .catch(function (response) {
      Cookies.set("adminMessage", response.response.data.message.ar);
    })
    .finally(() => disableFun());
};
export const addSeason = (gradeId, number, file, disableFun = () => {}) => {
  let data = new FormData();
  data.append("gradeId", gradeId);
  data.append("number", number);
  data.append("photo", file);
  axios({
    method: "post",
    url: `${baseUrl}/seasons`,
    data: data,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function (response) {
      Cookies.set("adminMessage", "تم الاضافة بنجاح ");
    })
    .catch(function (response) {
      Cookies.set("adminMessage", response.response.data.message.ar);
    })
    .finally(() => disableFun());
};
// export const addSubjects = (seasonId, title, video, file) => {
//     let data = new FormData()
//     data.append('seasonId', seasonId)
//     data.append('title', title)
//     data.append('video', video)
//     data.append('photo', file)
//     axios({
//         method: "post",
//         url: `${baseUrl}/subjects`,
//         data: data,
//         headers: {
//             'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
//             "Content-Type": "multipart/form-data"
//         },
//     }).then(function (response) {
// }

export const addSubjects = (
  seasonId,
  title,
  video,
  file,
  videoType,
  disableFun = () => {}
) => {
  let data = new FormData();
  data.append("seasonId", seasonId);
  data.append("title", title);
  data.append("videoURL", video);
  data.append("photo", file);
  data.append("videoType", videoType);
  axios({
    method: "post",
    url: `${baseUrl}/subjects`,
    data: data,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function (response) {
      Cookies.set("adminMessage", "تم الاضافة بنجاح ");
    })
    .catch(function (response) {
      Cookies.set("adminMessage", response.response.data.message.ar);
    })
    .finally(() => disableFun());
};
export const addUnit = (subjectId, title, disableFun = () => {}) => {
  let data = new FormData();
  data.append("subjectId", subjectId);
  data.append("title", title);
  axios({
    method: "post",
    url: `${baseUrl}/units`,
    data: data,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function (response) {
      Cookies.set("adminMessage", "تم الاضافة بنجاح ");
    })
    .catch(function (response) {
      Cookies.set("adminMessage", response.response.data.message.ar);
    })
    .finally(() => disableFun());
};

export const addLesson = (unitId, title, disableFun = () => {}) => {
  let data = new FormData();
  data.append("unitId", unitId);
  data.append("title", title);
  axios({
    method: "post",
    url: `${baseUrl}/lessons`,
    data: data,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function (response) {
      Cookies.set("adminMessage", "تم الاضافة بنجاح ");
    })
    .catch(function (response) {
      Cookies.set("adminMessage", response.response.data.message.ar);
    })
    .finally(() => disableFun());
};
export const addVideo = (
  lessonId,
  title,
  video,
  description,
  disableFun = () => {}
) => {
  let data = new FormData();
  data.append("lessonId", lessonId);
  data.append("title", title);
  data.append("description", description);
  data.append("url", video);
  data.append("type", "url");
  // data.append('video', video)
  axios({
    method: "post",
    url: `${baseUrl}/lessons/video`,
    data: data,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function (response) {
      Cookies.set("adminMessage", "تم الاضافة بنجاح ");
    })
    .catch(function (response) {
      Cookies.set("adminMessage", response.response.data.message.ar);
    })
    .finally(() => disableFun());
};
export const addDoc = (lessonId, title, file, disableFun = () => {}) => {
  let data = new FormData();
  data.append("lessonId", lessonId);
  data.append("title", title);
  data.append("file", file);
  axios({
    method: "post",
    url: `${baseUrl}/lessons/document`,
    data: data,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function (response) {
      Cookies.set("adminMessage", "تم الاضافة بنجاح ");
    })
    .catch(function (response) {
      Cookies.set("adminMessage", response.response.data.message.ar);
    })
    .finally(() => disableFun());
};
export const addQuiz = (lessonId, title, disableFun = () => {}) => {
  let data = new FormData();
  data.append("lessonId", lessonId);
  data.append("title", title);
  axios({
    method: "post",
    url: `${baseUrl}/lessons/quiz`,
    data: data,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function (response) {
      Cookies.set("adminMessage", "تم الاضافة بنجاح ");
    })
    .catch(function (response) {
      Cookies.set("adminMessage", response.response.data.message.ar);
    })
    .finally(() => disableFun());
};
export const addQuestion = (
  quizId,
  question,
  answare,
  fullOptions,
  photo,
  disableFun = () => {}
) => {
  let data = new FormData();
  data.append("quizId", quizId);
  data.append("title", question);
  data.append("photo", photo);
  data.append("answer", answare);
  fullOptions.forEach((e) => data.append("options", e));
  axios({
    method: "post",
    url: `${baseUrl}/lessons/questions`,
    data: data,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function (response) {
      Cookies.set("adminMessage", "تم الاضافة بنجاح ");
    })
    .catch(function (response) {
      Cookies.set("adminMessage", response.response.data.message.ar);
    })
    .finally(() => disableFun());
};
