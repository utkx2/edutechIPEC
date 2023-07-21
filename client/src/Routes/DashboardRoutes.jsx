import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";

import DashboardHome from "../Admin/partials/dashboard/DashboardHome";

import DashboardUsers from "../Admin/partials/dashboard/users/DashboardUsers";

import WebsiteHome from '../Admin/partials/dashboard/DynamicPages/Home'
import WebsiteAbout from '../Admin/partials/dashboard/DynamicPages/About'
import WebsiteWhy from '../Admin/partials/dashboard/DynamicPages/Why'
import WebsiteTestimonials from '../Admin/partials/dashboard/DynamicPages/Testimonials'
import WebsiteResult from '../Admin/partials/dashboard/DynamicPages/Result'
import WebsiteCourses from '../Admin/partials/dashboard/DynamicPages/Courses'
import WebsiteContact from '../Admin/partials/dashboard/DynamicPages/Contact'

import AllUserRegistrations from "../Admin/partials/dashboard/Registrations/UserRegistrations";
import UserRegistrationDetails from "../Admin/partials/dashboard/Registrations/UserRegistrationDetails";
import SamplePaper from "../Admin/partials/dashboard/Downloads/SamplePaper";
import EBrochures from "../Admin/partials/dashboard/Downloads/EngineeringBrochure";
import Syllabus from "../Admin/partials/dashboard/Downloads/Syllabus";
import EngineeringBrochure from "../Admin/partials/dashboard/Downloads/EngineeringBrochure";
import MedicalBrochure from "../Admin/partials/dashboard/Downloads/MedicalBrochure";
import Questions from "../Admin/partials/dashboard/Exam/Questions";
import Answers from "../Admin/partials/dashboard/Exam/Answers";
import List from "../Admin/partials/dashboard/Exam/List";


const DashboardRoutes = () => {
  return (
    <div>
         <Routes>
            <Route
                path="/admin"
                element={<PrivateRoute element={DashboardHome} />}
            />
            <Route
              path="/users"
              element={<PrivateRoute element={DashboardUsers} />}
            />
            <Route
              path="/registrations"
              element={<PrivateRoute element={AllUserRegistrations} />}
            />
            <Route
              path="/home"
              element={<PrivateRoute element={WebsiteHome} />}
            />
            <Route
              path="/about"
              element={<PrivateRoute element={WebsiteAbout} />}
            />
            <Route
              path="/why"
              element={<PrivateRoute element={WebsiteWhy} />}
            />
            <Route
              path="/testimonials"
              element={<PrivateRoute element={WebsiteTestimonials} />}
            />
            <Route
              path="/result"
              element={<PrivateRoute element={WebsiteResult} />}
            />
            <Route
              path="/courses"
              element={<PrivateRoute element={WebsiteCourses} />}
            />
            <Route
              path="/contact"
              element={<PrivateRoute element={WebsiteContact} />}
            />
            <Route
              path="/registrations/:id"
              element={<PrivateRoute element={UserRegistrationDetails} />}
            />
             <Route
              path="/downloads/sample-paper"
              element={<PrivateRoute element={SamplePaper} />}
            />
            <Route
              path="/downloads/e-brochures"
              element={<PrivateRoute element={EBrochures} />}
            />
            <Route
              path="/downloads/syllabus"
              element={<PrivateRoute element={Syllabus} />}
            />
            <Route
              path="/downloads/engineering-brochure"
              element={<PrivateRoute element={EngineeringBrochure} />}
            />
            <Route
              path="/downloads/medical-brochure"
              element={<PrivateRoute element={MedicalBrochure} />}
            />
            <Route
              path="/questions"
              element={<PrivateRoute element={Questions} />}
            />
            <Route
              path="/answers"
              element={<PrivateRoute element={Answers} />}
            />
            <Route
              path="/list"
              element={<PrivateRoute element={List} />}
            />
         </Routes>
    </div>
//     <div>

//       <Routes>
//         <Route
//           path="/admin"
//           element={<PrivateRoute element={DashboardHome} />}
//         />

//         {/* Users */}
//         <Route
//           path="/users"
//           element={<PrivateRoute element={DashboardUsers} />}
//         />
//         <Route
//           path="/user/:userId"
//           element={<PrivateRoute element={DashboardUserDetail} />}
//         />
//         <Route path="/alladmin" element={<PrivateRoute element={AllAdmin} />} />
//         <Route path="/allhr" element={<PrivateRoute element={AllHR} />} />
//         <Route
//           path="/allemployee"
//           element={<PrivateRoute element={AllEmployee} />}
//         />

//         {/* Add User */}
//         <Route path="/addadmin" element={<PrivateRoute element={AddAdmin} />} />
//         <Route path="/addhr" element={<PrivateRoute element={AddHR} />} />
//         <Route
//           path="/addemployee"
//           element={<PrivateRoute element={AddEmployee} />}
//         />
//         <Route path="/adduser" element={<PrivateRoute element={AddUser} />} />

//         {/* Tenders */}
//         <Route
//           path="/tenders"
//           element={<PrivateRoute element={AllTendersSection} />}
//         />
//         <Route
//           path="/contractor"
//           element={<PrivateRoute element={Contractor} />}
//         />
//         <Route
//           path="/subcontractor"
//           element={<PrivateRoute element={Subcontractor} />}
//         />

//         <Route
//           path="/Government"
//           element={<PrivateRoute element={Government} />}
//         />
//         <Route path="/Gem" element={<PrivateRoute element={Gem} />} />

//         <Route path="/Private" element={<PrivateRoute element={Private} />} />
//         <Route
//           path="/tenders/currenttenders"
//           element={<PrivateRoute element={DashboardCurrentTenders} />}
//         />
//         <Route
//           path="/tender/forms"
//           element={<PrivateRoute element={AdminForm} />}
//         />
//         <Route
//           path="/tender/:tenderId"
//           element={<PrivateRoute element={DashboardTenderDetail} />}
//         />

//         {/*Tender Result*/}
//         <Route
//           path="/tender/results/forms"
//           element={<PrivateRoute element={AdminTenderResultForm} />}
//         />
//         <Route
//           path="/tender/results/lists"
//           element={<PrivateRoute element={AdminTenderResultList} />}
//         />

//         {/* <Router
//           path='//tenderResults/:TenderResultId'
//           element={ }
//         /> */}

//         <Route path="/userDashboard" element={<UserPanel />} />

//         {/* Requests */}

//         {/* Employer */}
//         <Route
//           path="/employerrequests"
//           element={<PrivateRoute element={EmployerForms} />}
//         />
//         <Route
//           path="/employerrequests/:id"
//           element={<PrivateRoute element={EmployerFormDetail} />}
//         />

//         {/* Company */}
//         <Route
//           path="/companyrequests"
//           element={<PrivateRoute element={CompanyList} />}
//         />
//         <Route
//           path="/companyrequests/:id"
//           element={<PrivateRoute element={CompanyDetails} />}
//         />

//         {/* Individual */}
//         <Route
//           path="/individualrequests"
//           element={<PrivateRoute element={IndividualList} />}
//         />
//         <Route
//           path="/individualrequests/:id"
//           element={<PrivateRoute element={IndividualDetails} />}
//         />

//         {/* Registration */}
//         <Route
//           path="/registrationrequests"
//           element={<PrivateRoute element={RegistrationList} />}
//         />
//         <Route
//           path="/registrationrequests/:id"
//           element={<PrivateRoute element={RegistrationDetails} />}
//         />

//         {/* Seeker */}
//         <Route
//           path="/seekerrequests"
//           element={<PrivateRoute element={Seeker} />}
//         />
//         <Route
//           path="/seekerrequests/:id"
//           element={<PrivateRoute element={SeekerFormDetail} />}
//         />

//         {/* License */}
//         <Route
//           path="/licenserequests"
//           element={<PrivateRoute element={Licenserequests} />}
//         />

//         {/* Auction Material*/}
//         <Route
//           path="/auctionmaterialrequests"
//           element={<PrivateRoute element={AuctionMaterial} />}
//         />
//         <Route
//           path="/auctionmaterialrequests/:id"
//           element={<PrivateRoute element={AuctionMaterialDetail} />}
//         />

//         {/* Joint Venture */}
//         <Route
//           path="/jointventurerequests"
//           element={<PrivateRoute element={JointVenture} />}
//         />
//         <Route
//           path="/jointventurerequests/:id"
//           element={<PrivateRoute element={JointVentureDetail} />}
//         />

//         {/* Tender Online */}
//         <Route
//           path="/tenderonlinerequests"
//           element={<PrivateRoute element={TenderOnline} />}
//         />
//         <Route
//           path="/tenderonlinerequests/:id"
//           element={<PrivateRoute element={TenderOnlineDetail} />}
//         />

//         {/* Gem Registration */}
//         <Route
//           path="/gemregistration"
//           element={<PrivateRoute element={GemRegistration} />}
//         />
//         <Route
//           path="/gemregistration/:id"
//           element={<PrivateRoute element={GemRegistrationDetail} />}
//         />

//         <Route
//           path="/contact"
//           element={<PrivateRoute element={ContactFormList} />}
//         />

//         {/* Offline Tender */}
//         <Route
//           path="/tenderofflinerequests"
//           element={<PrivateRoute element={TenderOffline} />}
//         />

//         {/* <Route
//           path="/onlinebidding"
//           element={<PrivateRoute element={OnlineBidding} />}
//         />
//         <Route
//           path="/regcert"
//           element={<PrivateRoute element={RegistrationCertification} />}
//         />
//         <Route
//           path="/tenderresult"
//           element={<PrivateRoute element={TenderResult} />}
//         /> */}

//         {/* Options */}
//         <Route
//           path="/department"
//           element={<PrivateRoute element={Department} />}
//         />
//         <Route path="/category" element={<PrivateRoute element={Category} />} />
//         <Route path="/sector" element={<PrivateRoute element={Sector} />} />
//         <Route path="/product" element={<PrivateRoute element={Product} />} />
//         <Route path="/license" element={<PrivateRoute element={License} />} />
//         <Route
//           path="/auctionmaterial"
//           element={<PrivateRoute element={Material} />}
//         />

//         <Route path="/formprices" element={<PrivateRoute element={Prices} />} />

//         {/* Temp */}
//         <Route
//           path="/addproject"
//           element={<PrivateRoute element={AddProject} />}
//         />
//         <Route
//           path="/allproject"
//           element={<PrivateRoute element={AllProjects} />}
//         />
//         <Route
//           path="/allprojects/:projectId"
//           element={<PrivateRoute element={DashboardProjectDetail} />}
//         />

//         <Route path="/test" element={<Prices />} />
//         <Route path="*" element={"NOT Allowed"} />
//       </Routes>
//     </div>
  );
};

export default DashboardRoutes;
