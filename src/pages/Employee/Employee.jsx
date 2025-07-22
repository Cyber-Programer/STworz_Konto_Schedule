
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { RxCross1 } from "react-icons/rx";

const initialEmp = [
  {
    id: 1,
    name: "John De",
    email: "johndexkyewasfkdsu7rjekrn@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Farabi Hasan",
    email: "farabihasan@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Sifat Hasan",
    email: "sifathasan@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Shariful Islam",
    email: "sharifulislam@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    name: "Sohag",
    email: "sohag@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Furkan",
    email: "furkan@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 7,
    name: "John De",
    email: "johndexkyewasfkdsu7rjekrn@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 8,
    name: "Farabi Hasan",
    email: "farabihasan@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 9,
    name: "Sifat Hasan",
    email: "sifathasan@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 10,
    name: "Shariful Islam",
    email: "sharifulislam@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 11,
    name: "Sohag",
    email: "sohag@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 12,
    name: "Furkan",
    email: "furkan@gmail.com",
    profileImage: "https://randomuser.me/api/portraits/men/6.jpg",
  },
];

const Employee = () => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState(initialEmp);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (isEditing) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editEmployeeId ? { ...emp, ...formData } : emp
        )
      );
    } else {
      const newEmployee = {
        id: employees.length + 1,
        ...formData,
      };
      setEmployees((prev) => [...prev, newEmployee]);
    }

    setFormData({ name: "", email: "", profileImage: "" });
    setShowModal(false);
    setIsEditing(false);
    setEditEmployeeId(null);
  };

  const handleRemove = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleEdit = (emp) => {
    setFormData({
      name: emp.name,
      email: emp.email,
      profileImage: emp.profileImage || "",
    });
    setEditEmployeeId(emp.id);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="mt-7 md:mt-0 bg-white z-10 px-4 py-4  sticky top-0 flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
        
        <h2 className="text-3xl md:text-[2rem] font-semibold text-textClr">
          {t("employee.title")}
        </h2>
        <div className="text-right mt-1.5">
          <button
          className="cursor-pointer text-sm w-max md:w-[200px] p-3 bg-Primary text-white rounded hover:bg-blue-700 transition-all duration-300"
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setFormData({ name: "", email: "", profileImage: "" });
          }}
        >
          + {t("employee.addNew")}
        </button>
        </div>
        
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed px-4 inset-0 flex items-center justify-center bg-textClr/20 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              <RxCross1 size={16} />
            </button>
            <h3 className="text-Primary text-2xl font-medium text-center mb-4">
              {isEditing ? t("employee.editTitle") : t("employee.addTitle")}
            </h3>

            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl">
                {/* Placeholder Image */}
              </div>
              <button className="mt-4 cursor-pointer w-max text-sm px-4 py-1 bg-[#8E8E8E] text-white rounded-lg">
                {t("employee.addPhoto")}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">{t("employee.nameLabel")}</label>
                <input
                  type="text"
                  name="name"
                  placeholder={t("employee.namePlaceholder")}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-textClr/30 p-2 rounded outline-none bg-Gray"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">{t("employee.emailLabel")}</label>
                <input
                  type="email"
                  name="email"
                  placeholder={t("employee.emailPlaceholder")}
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
                {isEditing ? t("employee.updateBtn") : t("employee.addBtn")}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Employee List */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="flex items-center justify-between bg-Gray p-4 mb-3 shadow-sm rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  emp.profileImage ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    emp.name
                  )}`
                }
                alt={emp.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{emp.name}</div>
                <div className="text-gray-500 text-sm w-40 truncate md:w-auto">
                  {emp.email}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <button
                className="cursor-pointer text-sm bg-white px-3 py-1 rounded border border-textClr/20"
                onClick={() => handleEdit(emp)}
              >
                {t("employee.edit")}
              </button>
              <button
                onClick={() => handleRemove(emp.id)}
                className="cursor-pointer text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                {t("employee.remove")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employee;
