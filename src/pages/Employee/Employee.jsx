import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RxCross1 } from "react-icons/rx";
import baseApi from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endPoints";
import { getToken } from "../../utils/helper";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

const Employee = () => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const token = getToken(import.meta.env.VITE_ACCESS_TOKEN_KEY);
  const [searchEmp, setSearchEmp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
  });

  const [imageFile, setImageFile] = useState(null); // for uploading
  const [imageUrl, setImageUrl] = useState(""); // for previewing existing
  const [imagePreviewUrl, setImagePreviewUrl] = useState(""); // for new file preview

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage" && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      // Create preview URL for the new file
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Employee Account creating function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email)
      return toast.error("Name and Email are required");

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    if (imageFile) {
      form.append("img", imageFile);
    }

    try {
      const res = await baseApi.post(ENDPOINTS.ADD_NEW_EMPLOYEE, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status !== 201) return toast.error("Employee Create problem.");
      toast.success("Employee added successfully");
      setEmployees((prev) => [...prev, res.data]);

      // Reset form and close modal
      resetForm();
    } catch (error) {
      const nameError = error.response.data.name[0];
      const emailError = error.response.data.email[0];

      if (nameError) {
        toast.error(nameError);
      }
      if (emailError) {
        toast.error(emailError);
      }

      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.detail ||
        error.message;
      toast.error(`Failed to submit: ${errorMessage}`);
      console.error("handleSubmit error:", error);
    }
  };

  // Employee Account Remove function
  const handleRemove = async (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    try {
      const res = await baseApi.delete(
        ENDPOINTS.DELETE_SPECIFIC_EMPLOYEE + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      toast.success("Employee removed successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data.errors?.email?.[0]) ||
        error.message;

      toast.error(`Remove Error: ${errorMessage}`);
      console.log(error);

      // Restore employee if delete failed
      getEmployeeList();
    }
  };

  // Employee Account Info Edit
  const handleEdit = (emp) => {
    setFormData({
      name: emp.name || "",
      email: emp.email || "",
      profileImage: "",
    });
    setImageFile(null); // Clear previous file
    setImagePreviewUrl(""); // Clear preview
    setImageUrl(emp.img || ""); // Existing image URL from server
    setEditEmployeeId(emp.id);
    setIsEditing(true);
    setShowModal(true);
  };

  // Update Account Info Function
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email)
      return toast.error("Name and Email are required");

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);

    // Append image file only if user selected a new one
    if (imageFile) {
      form.append("img", imageFile);
    }

    try {
      const res = await baseApi.patch(
        `${ENDPOINTS.UPDATE_EMPLOYEE}${editEmployeeId}/`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update response:", res.data);
      toast.success("Employee updated successfully");

      // Update employees state with new data from backend
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editEmployeeId ? res.data : emp))
      );

      // Reset form and close modal
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.detail ||
        error.message;

      toast.error(`Failed to update: ${errorMessage}`);
      console.error("handleUpdate error:", error);
    }
  };

  // Helper function to reset form state
  const resetForm = () => {
    setFormData({ name: "", email: "", profileImage: "" });
    setImageFile(null);
    setImageUrl("");
    setImagePreviewUrl("");
    setShowModal(false);
    setIsEditing(false);
    setEditEmployeeId(null);
  };

  useEffect(() => {
    const filterEmp = employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchEmp.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchEmp.toLowerCase())
    );

    setFilteredEmployee(filterEmp);
  }, [employees, searchEmp]);

  // Filter Employee List

  // Get employee list function
  const getEmployeeList = async () => {
    try {
      const res = await baseApi.get(ENDPOINTS.ALL_EMPLOYEE_LIST, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setEmployees(res.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data.errors?.email?.[0]) ||
        error.message;

      toast.error(`Fetch Error: ${errorMessage}`);
      console.log(error);
    }
  };

  // Get Employee list every render
  useEffect(() => {
    getEmployeeList();
  }, [token]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  // Get current image source for modal preview
  const getCurrentImageSrc = () => {
    // Priority: new file preview > existing server image > default avatar
    if (imagePreviewUrl) {
      return imagePreviewUrl;
    }
    if (imageUrl) {
      return `${
        import.meta.env.VITE_SERVER_URL
      }${imageUrl}?t=${new Date().getTime()}`;
    }
    return "https://ui-avatars.com/api/?name=Demo";
  };

  return (
    <div className="h-screen flex flex-col gap-5 overflow-hidden">
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
              setImageFile(null);
              setImageUrl("");
              setImagePreviewUrl("");
            }}
          >
            + {t("employee.addNew")}
          </button>
        </div>
      </div>

      <div className="relative w-[98%] flex">
        <input
          type="text"
          value={searchEmp}
          onChange={(e) => setSearchEmp(e.target.value)}
          className="border-2 border-gray-300 w-full px-5 py-3 ml-3 rounded-2xl pr-10 outline-0"
          placeholder="Search employees..."
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed px-4 inset-0 flex items-center justify-center bg-textClr/20 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl cursor-pointer"
              onClick={resetForm}
            >
              <RxCross1 size={16} />
            </button>
            <h3 className="text-Primary text-2xl font-medium text-center mb-4">
              {isEditing ? t("employee.editTitle") : t("employee.addTitle")}
            </h3>

            <div className="flex flex-col items-center mb-6">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={getCurrentImageSrc()}
                alt="Employee"
              />

              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                id="uploadImage"
              />
              <label
                htmlFor="uploadImage"
                className="mt-4 cursor-pointer w-max text-sm px-4 py-1 bg-[#8E8E8E] text-white rounded-lg"
              >
                {t("employee.addPhoto")}
              </label>
            </div>

            <form
              onSubmit={isEditing ? handleUpdate : handleSubmit}
              className="space-y-4"
            >
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
        {filteredEmployee.map((emp) => (
          <div
            key={emp.id}
            className="flex items-center justify-between bg-Gray p-4 mb-3 shadow-sm rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  emp.img === null
                    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        emp.name
                      )}`
                    : `${import.meta.env.VITE_SERVER_URL}${
                        emp.img
                      }?t=${new Date().getTime()}`
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
