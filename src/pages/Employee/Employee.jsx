
import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";


const initialEmp = [
  {
    id: 1,
    name: "John De",
    email: "johnde@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    name: "Farabi Hasan",
    email: "farabihasan@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    name: "Sifat Hasan",
    email: "sifathasan@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 4,
    name: "Shariful Islam",
    email: "sharifulislam@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    id: 5,
    name: "Sohag ",
    email: "sohag@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/5.jpg"
  },
   {
    id: 6,
    name: "Furkan ",
    email: "furkan@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/6.jpg"
  },
];

const Employee = () => {
  const [employees, setEmployees] = useState(initialEmp);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profileImage: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newEmployee = {
      id: employees.length + 1,
      ...formData
    };

    setEmployees(prev => [...prev, newEmployee]);
    setFormData({ name: '', email: '', profileImage: '' });
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <div className="flex  justify-between items-center mb-8">
        <h2 className="text-[2rem] font-semibold leading-[22px] text-textClr">Employee</h2>
        <button
          className="cursor-pointer w-[200px] h-12 p-3 bg-Primary text-white rounded hover:bg-blue-700 transition-all duration-300"
          onClick={() => setShowModal(true)}
        >
         + Add New Employee
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed px-4 inset-0 flex items-center justify-center bg-textClr/20 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">

            {/* cross button on the top right side of the modal  */}
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              <RxCross1 size={16}/>
            </button>
            <h3 className="text-Primary text-2xl font-medium text-center mb-4">Add New Employee</h3>
                {/* Image Placeholder + Add Photo */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl">
                {/* replace image <img>  */}
              </div>
              <button className="mt-4 cursor-pointer w-[103px] h-7.5 text-sm px-4 py-1 bg-[#8E8E8E] text-white rounded-lg">
                Add Photo
              </button>
            </div>
            {/* form section  */}
            <form onSubmit={handleSubmit} className="space-y-4">
           <div>
            <label className='block mb-2' >Employee Name</label>
               <input
                type="text"
                name="name"
                placeholder="Enter Employee Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-textClr/30 p-2 rounded outline-none bg-Gray"
                required
              />
           </div>
           <div>
            <label className='block mb-2' >Email</label>
            
              <input
                type="email"
                name="email"
                placeholder="Enter Employee Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-textClr/30 p-2 rounded outline-none bg-Gray"
                required
              />
           </div>
           
              <button
                type="submit"
                className="cursor-pointer w-full bg-Primary text-white py-2 rounded transition-all hover:bg-blue-700 duration-300"
              >
                Add 
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Employee List */}
      <div className="w-full">
        {/* <h2 className="text-xl font-semibold mb-4">Employee List</h2> */}
        {employees.map(emp => (
          <div
            key={emp.id}
            className="flex bg-Gray items-center gap-4  p-4  mb-3 shadow-sm"
          >
            <img
              src={
                emp.profileImage ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}`
              }
              alt={emp.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-medium">{emp.name}</div>
              <div className="text-gray-500 text-sm">{emp.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employee;

