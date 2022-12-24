import { createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { UserAuth } from "v1/context/AuthContext";
import Signin from "v1/pages/Signin";
import Signup from "v1/pages/Signup";
import PasswordRemmber from "v1/pages/PasswordRemmber";
import Main from "v1/pages/Main";
import Class from "v1/pages/Class";
import Material from "v1/pages/Material";
import Package from "v1/pages/Package";
import Info from "v1/pages/Info";
import Lesson from "v1/pages/Lesson";
import Profile from "v1/pages/Profile";
import Privacy from "v1/pages/Privacy.jsx";
import Instructions from "v1/pages/Instructions";
import Season from "v1/pages/Season";
import VideoLesson from "v1/pages/VideoLesson";
import SignupWithGoogle from "v1/pages/SignupWithGoogle";
import Quiz from "v1/pages/Quiz";
import Verify from "v1/pages/Verify";
import AddLesson from "v1/adminPages/AddLesson";
import AddLevel from "v1/adminPages/AddLevel";
import AddClass from "v1/adminPages/AddClass";
import AddVideo from "v1/adminPages/AddVideo";
import AddSeason from "v1/adminPages/AddSeason";
import AddSubjects from "v1/adminPages/AddSubjects";
import AddUnits from "v1/adminPages/AddUnits";
import AddDoc from "v1/adminPages/AddDoc";
import AddQuiz from "v1/adminPages/AddQuiz";
import AddQuizQuestion from "v1/adminPages/AddQuizQuestion";
import AddQuestion from "v1/adminPages/AddQuestion ";
import ControlPanel from "v1/adminPages/ControlPanel";

const content = {
  about:
    "لقد أصبح استخدام المواقع والبوابات الإلكترونية جزءا أساسيا من العملية التعليمية المتطورةوالناجحة، وتقليداً يميز المؤسسات التعليمية الناجحة والمواكبة للتقدم العلمي والتكنولوجي خاصة فيما يتعلق بتمكين المعلمين والإدارة المدرسية من التواصل بشكل مهني مع الطلبةوأولياء أمورهم وحفظ أرشيف كامل متعلق بالطالب منذ إلتحاقه بالعملية التعليمية حتى إنهائه المرحلة الثانوية.ولكون فلسطين تعتبر واحدة منأفضل الدول في المنطقة من ناحية عدد مستخدمي الإنترنت، ووجود بنية تحتية مهيئة لربط المدارس بشبكة الإنترنت خلال 3 – 5 سنوات على حد أكثر،ولحاجة الكويت الماسة لوجود بوابة إلكترونية متطورة وحديثة للتواصل ما بين المدرسة والطلبة والأهالي، ولكون مشروع الحكومة الإلكترونية قدوصل مراحل متقدمة في التخطيط والتنفيذ، فإن فلسطين مرشحة لأن تكون من أفضل الدول المهيئة لتطبيق فكرة وجود بوابة إلكترونية موحدة تجمع جميعالمدارس الحكومية بإشراف وإرشاد تام من قبل وزارة التربية والتعليم.ومن هنا جاءت فكرة إنشاء بيئة التواصل الالكتروني المدرسي الموحد لتوفر جميعالخدمات الإلكترونية الممكنة لدعم العملية التعليمية والتواصل ما بين جميع أطرافها باستخدام أحدث وأكثر الأساليب والأدوات تطوراً وتقدماً وسهولة.",
  privacy:
    "نحن في منصة بيان  نحترم خصوصيتك ونريدك أن تفهم كيف نجمع ونستخدم ونشارك بيانا تغطي سياسة الخصوصية هذه ممارسات جمع المعلومات وتصف حقوقك للوصول إلى معلوماتك الشخصية أو الاستخدام السليم لها أو القيود عليها ومالم نربط سياسة أخرى أو ينص خلاف ذلك، فإن سياسة الخصوصية هذه تستخدم عند زيارة أو استخدام الموقع الإلكتروني لعٌلا أو التطبيقات الإلكترونية أو واجهة برمجة التطبيقات الخاصة بها أو الخدمات المرتبطة بها . عند استخدامك للخدمات، فأنت توافق على بنود هذه الإتفاقية، وينبغي عليك عدم استخدام الخدمات إذا لم توافق على سياسة الخصوصية هذه أو أي اتفاق آخر يحكم استخدامك للخدمات.  ",
  instructions:
    "لقد أصبح استخدام المواقع والبوابات الإلكترونية جزءا أساسيا من العملية التعليمية المتطورةوالناجحة، وتقليداً يميز المؤسسات التعليمية الناجحة والمواكبة للتقدم العلمي والتكنولوجي خاصة فيما يتعلق بتمكين المعلمين والإدارة المدرسية من التواصل بشكل مهني مع الطلبةوأولياء أمورهم وحفظ أرشيف كامل متعلق بالطالب منذ إلتحاقه بالعملية التعليمية حتى إنهائه المرحلة الثانوية.ولكون فلسطين تعتبر واحدة منأفضل الدول في المنطقة من ناحية عدد مستخدمي الإنترنت، ووجود بنية تحتية مهيئة لربط المدارس بشبكة الإنترنت خلال 3 – 5 سنوات على حد أكثر،ولحاجة الكويت الماسة لوجود بوابة إلكترونية متطورة وحديثة للتواصل ما بين المدرسة والطلبة والأهالي، ولكون مشروع الحكومة الإلكترونية قدوصل مراحل متقدمة في التخطيط والتنفيذ، فإن فلسطين مرشحة لأن تكون من أفضل الدول المهيئة لتطبيق فكرة وجود بوابة إلكترونية موحدة تجمع جميعالمدارس الحكومية بإشراف وإرشاد تام من قبل وزارة التربية والتعليم.ومن هنا جاءت فكرة إنشاء بيئة التواصل الالكتروني المدرسي الموحد لتوفر جميعالخدمات الإلكترونية الممكنة لدعم العملية التعليمية والتواصل ما بين جميع أطرافها باستخدام أحدث وأكثر الأساليب والأدوات تطوراً وتقدماً وسهولة.",
};

export const AuthContext = createContext();

const AppRoutes = () => {
  const { Isauth, GetLevels } = UserAuth();
  useEffect(() => {
    Isauth();
    GetLevels();
  }, []);

  return (
    <Routes>
      <Route path="/admin" element={<ControlPanel />} />
      <Route path="/" element={<Main />} />
      <Route path="/admin/addLesson" element={<AddLesson />} />
      <Route path="/admin/addLevel" element={<AddLevel />} />
      <Route path="/admin/addClass" element={<AddClass />} />
      <Route path="/admin/addSeason" element={<AddSeason />} />
      <Route path="/admin/addSubjects" element={<AddSubjects />} />
      <Route path="/admin/AddUnits" element={<AddUnits />} />
      <Route path="/admin/addvideo" element={<AddVideo />} />
      <Route path="/admin/adddoc" element={<AddDoc />} />
      <Route path="/admin/addquiz" element={<AddQuiz />} />
      <Route path="/admin/addquizquestion" element={<AddQuizQuestion />} />
      <Route
        path="/admin/addquizquestion/:lessonId"
        element={<AddQuestion />}
      />
      <Route path="/class/:levelId" element={<Class />} />
      <Route path="/season/:classId" element={<Season />} />
      <Route
        path="/material/classId/:classId/seasonId/:seasonId"
        element={<Material />}
      />
      <Route
        path="/classId/:classId/season/:seasonId/package/:packageId/packageCapacity/:packageCapacity"
        element={<Package />}
      />
      <Route path="/lesson/:materialId" element={<Lesson />} />
      <Route
        path="/lesson/:materialId/unitId/:unitId/lessonDetails/:lessonId"
        element={<VideoLesson />}
      />
      <Route path="/quiz/:quizId" element={<Quiz />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/signupWithGoogle" element={<SignupWithGoogle />} />
      <Route path="/passwordRemmber" element={<PasswordRemmber />} />
      <Route
        path="/about"
        element={<Info main="من نحن" content={content.about} target="about" />}
      />
      <Route
        path="/privacy"
        element={
          <Privacy main="الخصوصية" content={content.privacy} target="privacy" />
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
      <Route path="*" element={<Main />} />
    </Routes>
  );
};

export default AppRoutes;
