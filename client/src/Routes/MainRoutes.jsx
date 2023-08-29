import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react"; 
import Footer from "../components/Footer";
import Header from "../components/Header";

const About = lazy(() => import("../pages/About"));
const Result = lazy(() => import("../pages/Results"));
const OurMission = lazy(() => import("../pages/OurMission"));
const WhyIPEC = lazy(() => import("../pages/WhyIPEC"));
const Registration = lazy(() => import("../pages/Registration"));
const Home = lazy(() => import("../pages/Home"));
const Course = lazy(() => import("../pages/Course"));
const CourseDetails = lazy(() => import("../pages/CourseDetails"));
const ContactUs = lazy(() => import("../pages/Contact-us"));
const Career = lazy(() => import("../pages/Career"));
const Testimonials = lazy(() => import("../pages/Testimonials"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Exam = lazy(() => import("../pages/Exam/Exam"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/SignUp"));
const ResultPage = lazy(() => import("../pages/resultPage"));
const ExamPage = lazy(() => import("../pages/Exam/ExamList"));
const Media = lazy(() => import("../pages/Media"));
const Downloads = lazy(() => import("../pages/Downloads"));
const VerificationPage = lazy(() => import("../pages/VerificationPage"));
const QuickLinkDetail = lazy(() => import("../pages/QuickLinkDetail"));
const PayFail = lazy(() => import("../pages/PayFail"));
const ConfirmPay = lazy(() => import("../pages/ConfirmPay"));
const PaySuccess = lazy(() => import("../pages/PaySuccess"));
import PrivateRoute from './PrivateRoutes';
const MainRoutes = () => {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="flex items-center space-x-2 animate-bounce">
              <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify-otp" element={<VerificationPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/download" element={<Downloads />} />
          <Route path="/results" element={<Result />} />
          <Route path="/result/:score" element={<ResultPage />} />
          <Route path="/exam" element={<PrivateRoute element={ExamPage} />} />
          <Route
            path="/exam/:examId"
            element={<PrivateRoute element={Exam} />}
          />
          <Route path="/mission" element={<OurMission />} />
          <Route path="/why" element={<WhyIPEC />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/course" element={<Course />} />
          <Route path="/courseDetails/:id" element={<CourseDetails />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/media" element={<Media />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/quickLinkdetail/:id" element={<QuickLinkDetail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/confirm-payment" element={<ConfirmPay />} />
          <Route path="/pay-fail" element={<PayFail />} />
          <Route path="/pay-success" element={<PaySuccess />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default MainRoutes;
