import React, { useState, useRef, useEffect } from "react";
import WebIcons from "../../assets/images";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Settings, MessageCircle, Users, ImportIcon } from "lucide-react";
import { FaCamera } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import pp from "../../assets/pp.png";
import { useTranslation } from "react-i18next";
import { CiEdit } from "react-icons/ci";
import { removeToken } from "../../utils/helper";
import baseApi from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endPoints";
import { getToken } from "../../utils/helper";
import { toast } from "react-toastify";
const Sidebar = ({ isOpen, toggleSidebar, selectedPage, setSelectedPage }) => {
  const { t } = useTranslation();
  // const [selectedNav, setSelectedNav] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("demo");
  const [email, setEmail] = useState("demo@g.com");
  const [changeName, setChangeName] = useState("");
  const [profileImage, setProfileImage] = useState(pp);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const token = getToken(import.meta.env.VITE_ACCESS_TOKEN_KEY);
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "home",
      name: t("sidebar.home"),
      path: "/dashboard",
      ico: IoHomeOutline,
    },
    {
      id: "employees",
      name: t("sidebar.employees"),
      path: "/employee",
      ico: Users,
    },
    {
      id: "schedules",
      name: t("sidebar.schedules"),
      path: "/schedule",
      ico: Settings,
    },
    { id: "chat", name: t("sidebar.chat"), path: "/chat", ico: MessageCircle },
    {
      id: "premium",
      name: t("sidebar.premium"),
      path: "/premium",
      ico: MdOutlineWorkspacePremium,
    },
  ];

  // Fetch user info.. api_>
  const getUserInfo = async () => {
    try {
      const res = await baseApi.get(ENDPOINTS.USERINFO, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setName(res.data.name);
      setEmail(res.data.email);
      setProfileImage(import.meta.env.VITE_SERVER_URL + res.data.image);
      console.log(res);
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data.errors.email[0]) || // fallback for object-based errors
        error.message;

      toast.error(`Registration Error: ${errorMessage}`);
      // console.error("Register error:", error.response?.data || error.message);
      console.log(error);
    }
  };

  // run the function in every render
  useEffect(() => {
    if (token) getUserInfo();
  }, [token]);

  // Profile pic upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the file for upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save button Function
  const handleSave = async () => {
    try {
      const formData = new FormData();

      if (changeName) {
        formData.append("name", changeName);
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await baseApi.patch(ENDPOINTS.USERINFO, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        if (changeName) setName(changeName);
        setChangeName("");
        setImageFile(null);
        toast.success("Updated successfully");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data.errors?.email?.[0]) ||
        error.message;

      toast.error(`Update Error: ${errorMessage}`);
      console.error(error);
    }
  };

  return (
    <div
      className={`fixed sm:static top-0 left-0 h-full w-auto bg-white z-50 shadow-md transform transition-transform duration-300
      ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0 p-6 flex flex-col justify-between border-r border-textClr/20`}
    >
      {/* Top Section */}
      <div className="mt-9 md:mt-0 flex flex-col gap-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer"
        >
          <img src={WebIcons.logo} alt="Logo" className="w-32" />
        </button>

        <div className="flex flex-col gap-3">
          {menuItems.map((e) => {
            const isSelected = selectedPage === e.id;
            const isBorderedch = e.id === "chat";
            const isBorderedpm = e.id === "premium";

            return (
              <div
                key={e.id}
                onClick={() => {
                  setSelectedPage(e.id);
                  navigate(e.path);
                  if (window.innerWidth < 640) toggleSidebar(); // close only on mobile
                }}
                className={`flex items-center gap-3 text-base font-semibold p-2 rounded-lg cursor-pointer transition
                ${isSelected ? "bg-Primary text-white" : "hover:bg-gray-100"}
                ${isBorderedch ? "border border-Primary text-Primary" : ""}
                ${isBorderedpm ? "border border-black" : ""}`}
              >
                <e.ico className="text-2xl" />
                {e.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col gap-6 relative">
        <div className="flex gap-4 items-center relative">
          <img
            src={profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold">{name}</h2>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
          <div>
            <CiEdit
              size={24}
              className="absolute top-0 right-0"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        <button
          onClick={() => {
            removeToken(import.meta.env.VITE_ACCESS_TOKEN_KEY);
            navigate("/");
          }}
          className="w-full py-2 border-2 border-Primary text-Primary hover:bg-Primary hover:text-white rounded-lg font-semibold text-lg"
        >
          {t("auth.logout")}
        </button>

        {/* profile section editable modal  */}
        {/* Modal */}
        {isModalOpen && (
          <div className="absolute bottom-[100%] left-1/2 -translate-x-1/2 w-[95%] bg-white border border-gray-200 rounded-xl p-4 shadow-xl z-50 transition-all duration-300">
            <div className="flex justify-center  relative mb-4">
              <img
                src={profileImage}
                alt="Editable Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <button
                className="absolute bottom-0 right-[calc(50%-40px)] bg-white border p-1 rounded-full"
                onClick={() => fileInputRef.current.click()}
              >
                <FaCamera className="text-gray-600" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">{t("sidebar.name")}</label>
              <input
                type="text"
                value={changeName || name}
                onChange={(e) => setChangeName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSave();
                    setIsModalOpen(false);
                  }
                }}
                className="w-full mb-2 p-2 border rounded outline-0"
                placeholder="Name"
              />
            </div>

            <button
              onClick={() => {
                setIsModalOpen(false);
                handleSave();
              }}
              className="mt-2 w-full bg-Primary text-white py-2 rounded font-semibold"
            >
              {t("sidebar.save")}
            </button>
            <button className="cursor-pointer">
              <RxCross2
                className="absolute top-2 right-2 text-gray-600 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
