import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Result from "./pages/Results";
import OurMission from "./pages/OurMission";
import WhyIPEC from "./pages/WhyIPEC";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Course from "./pages/Course";
import CourseDetails from "./pages/CourseDetails";
import ContactUs from "./pages/Contact-us";
import Career from "./pages/Career";
import Testimonials from "./pages/Testimonials";
// import Registration from "./components/Registration";

const App = () => {
  

  return (
   
    
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/results" element={<Result />} />
          <Route path="/mission" element={<OurMission />} />
          <Route path="/why" element={<WhyIPEC />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/course" element={<Course />} />
          <Route path="/courseDetails" element={<CourseDetails />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
        <Footer />
      </BrowserRouter>
   
  );
};


// <Route path="/registration" element={<Registration />} />

export default App;