import logo from "./logo.svg";
import Logo from "../assets/logo.jpg";
import Student from "../assets//student-img.png";
import AIR from "../assets/air.png";
import Example from "./carousel";
import { Link } from "react-router-dom";
function Footer() {
  const lowernav = [
    { name: "mission" },
    { name: "course" },
    { name: "result" },
    { name: "tesimonials" },
    { name: "media" },
    { name: "about ipec" },
    { name: "why ipec" },
    { name: "registration form" },
    { name: "home" },
    { name: "contact us" },
  ];

  const footerlinks1 = [
    { name: "HOME", link: "/" },
    { name: "MISSION", link: "/mission" },
    { name: "COURSE", link: "/course" },
    { name: "Result", link: "/results" },
    { name: "MEDIA", link: "/media" },
    { name: "ABOUT IPEC", link: "/about" },
    { name: "WHY IPEC", link: "/why" },
    { name: "CONTACT US", link: "/contact" },
    { name: "REGISTRATION FORM", link: "/registration" },
  ];
  const footerlinks2 = [
    {
      name: "Terms & Conditions",
      link: "https://www.termsandconditionsgenerator.com/live.php?token=NXPwbfSWzlsg6tyLfFbOSqQZAkrhWJU2",
    },
    {
      name: "Disclaimer",
      link: "https://www.disclaimergenerator.net/live.php?token=EaBIAYFfIBlQqGcNqkQnDemo7yuqiVJk",
    },
    {
      name: "Privacy Policy",
      link: "https://www.privacypolicygenerator.info/live.php?token=aH8q8nE1BvAIj2kCR5WiA216IKJUO5SO",
    },
  ];

  return (
    <div className="bg-[#343362] w-full ">
      {/* upper foot */}
      <div className="flex items-center  justify-center py-8">
        <div className="grid max-w-3xl relative grid-cols-1 md:grid-cols-3 text-white">
          {/* Quick Links */}
          <div className="md:col-span-2 pl-4 md:pl-0">
            <h1 className="mb-4 text-xl font-bold">Quick Links</h1>
            <div className="grid md:grid-cols-2 gap-3 text-md">
              <div>
                {footerlinks1.map((footLink) => (
                  <div
                    key={footLink.name}
                    className={`my-3 text-sm uppercase cursor-pointer ${
                      footLink.colorChange ? "text-yellow-400" : ""
                    }`}
                  >
                    <Link to={footLink.link}>{footLink.name}</Link>
                  </div>
                ))}
              </div>
              <div>
                {/* <div className="md:col-span-2 pl-8 md:pl-0"> */}
                <h1 className="mb-12 text-xl md:absolute top-1 left-66 font-bold">
                  OUR POLICY
                </h1>
                {/* <div className="absolute bottom-26 right-2/4"> */}
                {footerlinks2.map((footLink) => (
                  <div
                    key={footLink.name}
                    className={`my-3 text-sm uppercase cursor-pointer ${
                      footLink.colorChange ? "text-yellow-400" : ""
                    }`}
                  >
                    <Link to={footLink.link}>{footLink.name}</Link>
                  </div>
                ))}
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-1 mt-8 md:mt-0 pl-4 md:pl-0">
            <h1 className="mb-4 text-xl font-bold">Contact</h1>
            <div className="my-4">
              Reg. Office:- A-17, 3rd Floor, City Centre, Sec - 4, Above Saree
              Sangam, Bokaro Steel City, Jharkhand - 827001
            </div>
            <div className="my-4">
            Branch Office:-
301 Krishna Mathura Complex, Circular Rd, Beside Kaveri Resturant, Lalpur, Ranchi, Jharkhand 834001
            </div>
            <div className="my-4">
              <div>9818xxx768 / 8585xxx897 </div>
              <div>support@ipec.com</div>
            </div>
            <div className="pt-4 border-t border-white">Social Media</div>
          </div>
        </div>
      </div>

      {/* lower foot */}
      <div className="bg-[#1F1E5A] pl-4 md:pl-0 h-[35px] text-white flex items-center justify-center text-sm">
        © 2023 IPEC Classes | All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
