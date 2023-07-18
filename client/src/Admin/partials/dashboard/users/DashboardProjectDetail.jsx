// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import Sidebar from '../../Sidebar';
// import Header from '../../Header';

// function UserDetails() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const token = localStorage.getItem('token');
//   const [user, setUser] = useState(null);
//   const [selectedRole, setSelectedRole] = useState('');
//   const { userId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/apiTender/userdetails/single-user/${userId}`,
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               auth: token,
//             },
//           }
//         );
//         setUser(response.data.User[0]);
//         setSelectedRole(response.data.User[0].userRole);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUserDetails();
//   }, [userId, token]);

//   const handleDelete = async () => {
//     try {
//       // Make API call to delete the user
//       await axios.delete(
//         `http://localhost:5000/apiTender/userdetails/delete/${userId}`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             auth: token,
//           },
//         }
//       );

//       alert('Deleted');
//       navigate('/dashboard/users');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleRoleChange = (event) => {
//     setSelectedRole(event.target.value);
//   };

//   const handleUpdateRole = async (userId, selectedRole) => {
//     try {
//       // Make API call to update the user role
//       await axios.put(
//         'http://localhost:5000/apiTender/userdetails/updaterole',
//         {
//           userId: userId,
//           userRole: selectedRole,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             auth: token,
//           },
//         }
//       );

//       alert('Role updated successfully');
//       window.location.reload()
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Content area */}
//       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//         <main>
//           {/* Site header */}
//           <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//           <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
//             {/* Dashboard actions */}
//             <div className="container mx-auto py-8 px-4">
//               <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col">
//                 <div>
//                   <h1 className="text-3xl font-bold mb-6 text-gray-800">User Details</h1>
//                   <p className="mb-2 text-gray-700">
//                     <strong className="text-gray-900">Name:</strong>{' '}
//                     <span className="ml-2">{user.name}</span>
//                   </p>
//                   <p className="mb-2 text-gray-700">
//                     <strong className="text-gray-900">Email:</strong>{' '}
//                     <span className="ml-2">{user.email}</span>
//                   </p>
//                   <p className="mb-2 text-gray-700">
//                     <strong className="text-gray-900">User Role:</strong>{' '}
//                     <span className="ml-2">{user.userRole}</span>
//                   </p>
//                   <p className="mb-2 text-gray-700">
//                     <strong className="text-gray-900">Phone Number:</strong>{' '}
//                     <span className="ml-2">{user.phoneNumber}</span>
//                   </p>
//                   <p className="mb-2 text-gray-700">
//                     <strong className="text-gray-900">Country:</strong>{' '}
//                     <span className="ml-2">{user.country}</span>
//                   </p>
//                   <p className="mb-2 text-gray-700">
//                     <strong className="text-gray-900">State:</strong>{' '}
//                     <span className="ml-2">{user.state}</span>
//                   </p>
//                   <p className="mb-2 text-gray-700">
//                     <strong className="text-gray-900">City:</strong>{' '}
//                     <span className="ml-2">{user.city}</span>
//                   </p>
//                 </div>
//                 <div className="mt-4">
//                   <label
//                     className="block text-gray-700 text-sm font-bold mb-2"
//                     htmlFor="userRole"
//                   >
//                     Update Role:
//                   </label>
//                   <select
//                     className="w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
//                     id="userRole"
//                     name="userRole"
//                     value={selectedRole}
//                     onChange={handleRoleChange}
//                   >
//                     <option value="hr">HR</option>
//                     <option value="admin">Admin</option>
//                     <option value="employee">Employee</option>
//                     <option value="user">User</option>
//                   </select>
//                   <div className="mt-4 flex justify-between">
//                     <button
//                       className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded"
//                       onClick={() => handleUpdateRole(user.userId, selectedRole)}
//                     >
//                       Update Role
//                     </button>
//                     <button
//                       className="bg-[#182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded"
//                       onClick={handleDelete}
//                     >
//                       Delete
//                     </button>
//                   </div>

//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default UserDetails;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Sidebar";
import Header from "../../Header";

function ProjectDetails() {
  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { projectId } = useParams();

  const [editedProject, setEditedProject] = useState({
    pnr: "",
    companyname: "",
    detail: "",
    value: "",
    status: "",
    country: "",
    state: "",
    city: "",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:5000/apiTender/projects/${projectId}`,
        editedProject
      )
      .then((response) => {
        setProject(response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/apiTender/projects/${projectId}`)
      .then(() => {
        setIsDeleting(false);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/dashboard/allproject");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/apiTender/projects/${projectId}`)
      .then((response) => {
        setProject(response.data);
        setEditedProject({
          pnr: response.data.pnr,
          companyname: response.data.companyname,
          detail: response.data.detail,
          value: response.data.value,
          status: response.data.status,
          country: response.data.country,
          state: response.data.state,
          city: response.data.city,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDownload = () => {
    // Logic for downloading project file
    console.log("Download button clicked");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          {/* Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-xl mx-auto flex justify-center">
            {/* Dashboard actions */}
            <div className="container mx-auto py-8 px-4 ">
              {project && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                  <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Project Details
                  </h1>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">PNR:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="pnr"
                        value={editedProject.pnr}
                        onChange={handleEditChange}
                        className="ml-[94px] border border-gray-300 p-1 rounded "
                      />
                    ) : (
                      <span className="ml-[94px]">{project.pnr}</span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Company Name:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="companyname"
                        value={editedProject.companyname}
                        onChange={handleEditChange}
                        className="ml-2 border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      <span className="ml-2">{project.companyname}</span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Detail:</strong>{" "}
                    {isEditing ? (
                      <input
                        name="detail"
                        value={editedProject.detail}
                        onChange={handleEditChange}
                        className="ml-20 border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      <span className="ml-20">{project.detail}</span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Value:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="value"
                        value={editedProject.value}
                        onChange={handleEditChange}
                        className="ml-20 border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      <span className="ml-20">{project.value}</span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Status:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="status"
                        value={editedProject.status}
                        onChange={handleEditChange}
                        className="ml-[75px] border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      <span className="ml-[75px]">{project.status}</span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">Country:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="country"
                        value={editedProject.country}
                        onChange={handleEditChange}
                        className="ml-[60px] border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      <span className="ml-[60px]">{project.country}</span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">State:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="state"
                        value={editedProject.state}
                        onChange={handleEditChange}
                        className="ml-20 border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      <span className="ml-20">{project.state}</span>
                    )}
                  </p>
                  <p className="mb-2 text-gray-700">
                    <strong className="text-gray-900">City:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={editedProject.city}
                        onChange={handleEditChange}
                        className="ml-[90px] border border-gray-300 p-1 rounded"
                      />
                    ) : (
                      <span className="ml-[90px]">{project.city}</span>
                    )}
                  </p>
                  {isEditing ? (
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-[#111a2b] text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={handleEdit}
                      >
                        Save
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-[#182235] text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-[#182235] text-white font-bold py-2 px-4 rounded"
                        onClick={() => setIsDeleting(true)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
              {isDeleting && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                  <p className="text-gray-700">
                    Are you sure you want to delete this project?
                  </p>
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={handleDelete}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setIsDeleting(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {project && (
                <div className="text-center">
                  <button
                    className="bg-[182235] hover:bg-[#111a2b] text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProjectDetails;