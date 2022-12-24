/* eslint-disable react-hooks/exhaustive-deps */
import "v2/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "v2/auth/context";
import usersApi from "./api/user/users";

import AddLesson from "v2/pages/admin/AddLesson";
import AddLevel from "v2/pages/admin/AddLevel";
import AddGrade from "v2/pages/admin/AddGrade";
import AddSeason from "v2/pages/admin/AddSeason";
import AddSubjects from "v2/pages/admin/AddSubjects";
import AddUnits from "v2/pages/admin/AddUnits";
import AddDoc from "v2/pages/admin/AddDoc";
import AddVideo from "v2/pages/admin/AddVideo";
// import AddQuiz from "v2/pages/admin/AddQuiz";
// import AddQuizQuestion from "v2/pages/admin/AddQuizQuestion";
// import AddQuestion from "v2/pages/admin/AddQuestion ";
import ControlPanel from "v2/pages/admin/ControlPanel";

import ForgotPassword from "v2/pages/auth/ForgotPassword";
import Login from "v2/pages/auth/Login";
import Register from "v2/pages/auth/Register";
import RegisterWithGoogle from "v2/pages/auth/RegisterWithGoogle";
import Verify from "v2/pages/auth/Verify";

import Splash from "./pages/general/Splash";
import About from "v2/pages/general/About";
import Instructions from "v2/pages/general/Instructions";
import Main from "v2/pages/general/Main";
import Privacy from "v2/pages/general/Privacy";

import Grades from "v2/pages/tutorial/Grades";
import Seasons from "v2/pages/tutorial/Seasons";
import Subjects from "v2/pages/tutorial/Subjects";
import Lessons from "v2/pages/tutorial/lesson/Lessons";
// import Package from "v2/pages/tutorial/Package";
// import Quiz from "v2/pages/tutorial/lesson/Quiz";
import Video from "v2/pages/tutorial/lesson/Video";

import Profile from "v2/pages/user/Profile";
import { useState } from "react";
import { useEffect } from "react";

const content = {
  about:
    "لقد أصبح استخدام المواقع والبوابات الإلكترونية جزءا أساسيا من العملية التعليمية المتطورةوالناجحة، وتقليداً يميز المؤسسات التعليمية الناجحة والمواكبة للتقدم العلمي والتكنولوجي خاصة فيما يتعلق بتمكين المعلمين والإدارة المدرسية من التواصل بشكل مهني مع الطلبةوأولياء أمورهم وحفظ أرشيف كامل متعلق بالطالب منذ إلتحاقه بالعملية التعليمية حتى إنهائه المرحلة الثانوية.ولكون فلسطين تعتبر واحدة منأفضل الدول في المنطقة من ناحية عدد مستخدمي الإنترنت، ووجود بنية تحتية مهيئة لربط المدارس بشبكة الإنترنت خلال 3 – 5 سنوات على حد أكثر،ولحاجة الكويت الماسة لوجود بوابة إلكترونية متطورة وحديثة للتواصل ما بين المدرسة والطلبة والأهالي، ولكون مشروع الحكومة الإلكترونية قدوصل مراحل متقدمة في التخطيط والتنفيذ، فإن فلسطين مرشحة لأن تكون من أفضل الدول المهيئة لتطبيق فكرة وجود بوابة إلكترونية موحدة تجمع جميعالمدارس الحكومية بإشراف وإرشاد تام من قبل وزارة التربية والتعليم.ومن هنا جاءت فكرة إنشاء بيئة التواصل الالكتروني المدرسي الموحد لتوفر جميعالخدمات الإلكترونية الممكنة لدعم العملية التعليمية والتواصل ما بين جميع أطرافها باستخدام أحدث وأكثر الأساليب والأدوات تطوراً وتقدماً وسهولة.",
  privacy:
    "نحن في منصة بيان  نحترم خصوصيتك ونريدك أن تفهم كيف نجمع ونستخدم ونشارك بيانا تغطي سياسة الخصوصية هذه ممارسات جمع المعلومات وتصف حقوقك للوصول إلى معلوماتك الشخصية أو الاستخدام السليم لها أو القيود عليها ومالم نربط سياسة أخرى أو ينص خلاف ذلك، فإن سياسة الخصوصية هذه تستخدم عند زيارة أو استخدام الموقع الإلكتروني لعٌلا أو التطبيقات الإلكترونية أو واجهة برمجة التطبيقات الخاصة بها أو الخدمات المرتبطة بها . عند استخدامك للخدمات، فأنت توافق على بنود هذه الإتفاقية، وينبغي عليك عدم استخدام الخدمات إذا لم توافق على سياسة الخصوصية هذه أو أي اتفاق آخر يحكم استخدامك للخدمات.  ",
  instructions:
    "لقد أصبح استخدام المواقع والبوابات الإلكترونية جزءا أساسيا من العملية التعليمية المتطورةوالناجحة، وتقليداً يميز المؤسسات التعليمية الناجحة والمواكبة للتقدم العلمي والتكنولوجي خاصة فيما يتعلق بتمكين المعلمين والإدارة المدرسية من التواصل بشكل مهني مع الطلبةوأولياء أمورهم وحفظ أرشيف كامل متعلق بالطالب منذ إلتحاقه بالعملية التعليمية حتى إنهائه المرحلة الثانوية.ولكون فلسطين تعتبر واحدة منأفضل الدول في المنطقة من ناحية عدد مستخدمي الإنترنت، ووجود بنية تحتية مهيئة لربط المدارس بشبكة الإنترنت خلال 3 – 5 سنوات على حد أكثر،ولحاجة الكويت الماسة لوجود بوابة إلكترونية متطورة وحديثة للتواصل ما بين المدرسة والطلبة والأهالي، ولكون مشروع الحكومة الإلكترونية قدوصل مراحل متقدمة في التخطيط والتنفيذ، فإن فلسطين مرشحة لأن تكون من أفضل الدول المهيئة لتطبيق فكرة وجود بوابة إلكترونية موحدة تجمع جميعالمدارس الحكومية بإشراف وإرشاد تام من قبل وزارة التربية والتعليم.ومن هنا جاءت فكرة إنشاء بيئة التواصل الالكتروني المدرسي الموحد لتوفر جميعالخدمات الإلكترونية الممكنة لدعم العملية التعليمية والتواصل ما بين جميع أطرافها باستخدام أحدث وأكثر الأساليب والأدوات تطوراً وتقدماً وسهولة.",
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    usersApi.common
      .isAuth()
      .then((res) => {
        const user = res.data;
        setUser(user);
      })
      .catch((err) => {
        //
      });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Routes>
        {/* Admin Routes */}
        {user && user.role === "admin" && (
          <>
            <Route path="/admin" element={<ControlPanel />} />
            <Route path="/admin/addLesson" element={<AddLesson />} />
            <Route path="/admin/addLevel" element={<AddLevel />} />
            <Route path="/admin/addClass" element={<AddGrade />} />
            <Route path="/admin/addSeason" element={<AddSeason />} />
            <Route path="/admin/addSubjects" element={<AddSubjects />} />
            <Route path="/admin/AddUnits" element={<AddUnits />} />
            <Route path="/admin/addvideo" element={<AddVideo />} />
            <Route path="/admin/adddoc" element={<AddDoc />} />
          </>
        )}

        {/* User Routes */}
        {user && (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/lesson/:lessonId" element={<Video />} />
          </>
        )}

        {/* General Routes */}
        <Route path="/" element={<Main />} />

        {/* Tutorial Routes */}
        <Route path="/class/:levelId" element={<Grades />} />
        <Route path="/season/:gradeId" element={<Seasons />} />
        <Route
          path="/subjects/:seasonId/season/:gradeId"
          element={<Subjects />}
        />
        <Route path="/lessons/:subjectId" element={<Lessons />} />

        <Route
          path="/about"
          element={
            <About main="من نحن" content={content.about} target="about" />
          }
        />
        <Route
          path="/privacy"
          element={
            <Privacy
              main="الخصوصية"
              content={content.privacy}
              target="privacy"
            />
          }
        />
        <Route
          path="/instructions"
          element={
            <Instructions
              main=" التعليمات"
              content={content.instructions}
              target="instructions"
            />
          }
        />

        {/* Auth Routes */}
        {!user && (
          <>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/signupWithGoogle" element={<RegisterWithGoogle />} />
            <Route path="/passwordRemmber" element={<ForgotPassword />} />
          </>
        )}

        {/* Default & Notfound Pages */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* <Route path="/admin/addquiz" element={<AddQuiz />} />
        <Route path="/admin/addquizquestion" element={<AddQuizQuestion />} />
        <Route
        path="/admin/addquizquestion/:lessonId"
        element={<AddQuestion />}
      /> */}

      {/* <Route
          path="/classId/:classId/season/:seasonId/package/:packageId/packageCapacity/:packageCapacity"
          element={<Package />}
        /> */}

      {/* <Route path="/quiz/:quizId" element={<Quiz />} /> */}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
};

export default App;
