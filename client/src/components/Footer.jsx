import logo from './logo.svg';
import Logo from '../assets/logo.jpg'
import Student from '../assets//student-img.png'
import AIR from '../assets/air.png'
import Example from './carousel';

function Footer() {
  const lowernav = [
    {name: 'mission'},
    {name: 'course'},
    {name: 'result'},
    {name: 'tesimonials'},
    {name: 'media'},
    {name: 'about ipec'},
    {name: 'why ipec'},
    {name: 'registration form'},
    {name: 'home'},
    {name: 'contact us'}
  ]

  const footerlinks1 = [
    { name: 'ipec edge' },
    { name: 'Video' },
    { name: 'ipec Centers' },
    { name: 'business partners' },
    { name: 'iit-jee', colorChange: true },
    { name: 'medical', colorChange: true },
    { name: 'foundation', colorChange: true },
    { name: 'results', colorChange: true },
  ]
  const footerlinks2 = [
    { name: 'Terms & Conditions' },
    { name: 'Refund Policy' },
    { name: 'Privacy Policy' },
    { name: 'Transfer Policy' },
    { name: 'Facilitation Policy' },
    { name: 'Corporate Policies' },
    { name: 'CSR Policy' },
    { name: 'Modes of Payment' },
  ]  

  return (
    <div className="bg-[#343362] w-full">

      {/* upper foot */}
      <div className="flex items-center justify-center py-8">
        <div className="grid max-w-3xl grid-cols-1 md:grid-cols-3 text-white">

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h1 className="mb-4 text-xl font-bold">Quick Links</h1>
            <div className="grid md:grid-cols-2 gap-3 text-md">
              <div>
                {footerlinks1.map(footLink => (
                  <div
                    key={footLink.name}
                    className={`my-3 text-sm uppercase cursor-pointer ${
                      footLink.colorChange ? 'text-yellow-400' : ''
                    }`}
                  >
                    {footLink.name}
                  </div>
                ))}
              </div>
              <div>
                {footerlinks2.map(footLink => (
                  <div key={footLink.name} className="my-3 text-sm uppercase cursor-pointer">
                    {footLink.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-1 mt-8 md:mt-0">
            <h1 className="mb-4 text-xl font-bold">Contact</h1>
            <div className="my-4">
              Ipec Classes
              Aggrawal Corporate Heights,
              drd Floor, Plot no. A-7,
              xxtaji Subhash Place,
              Opposite xxzirpur Depot,
              Rohini, Delhi
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
      <div className="bg-[#1F1E5A] h-[35px] text-white flex items-center justify-center text-sm">
        © 2023 IPEC Classes | All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;