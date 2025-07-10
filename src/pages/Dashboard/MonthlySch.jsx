import React, { use, useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import WebIcons from "../../assets/images";
import Dashboard from "./Dashboard";
// Mock WebIcons for demonstration

const MonthlySch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenT, setIsOpenT] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [language, setLanguage] = useState("English");

  const years = [
    
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
    { value: "2028", label: "2028" },
    { value: "2029", label: "2029" },
    { value: "2030", label: "2030" },
    { value: "2031", label: "2031" },
    { value: "2032", label: "2032" },
    { value: "2033", label: "2033" },
  ];
  const languageList = ["English", "Polish"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  if (!showDashboard) {
    return (
      <div className="w-full flex flex-col gap-10 my-2 capitalize px-5">
        <h2 className="mt-7 md:mt-0 text-2xl md:text-[2rem] font-semibold font-Roboto text-textClr">
          Welcome to <br className="hidden md:block" /> Grafik Master
        </h2>

        <div className="flex flex-col md:flex-row gap-5 justify-between md:items-center">
          <span className="text-xl md:text-2xl font-semibold text-textClr font-Roboto">
            monthly generated schedules
          </span>

          {/* Custom Dropdown */}
          <div className="flex gap-5 justify-end">
            <div className="relative font-Inter">
              <button
                onClick={() => {
                  setIsOpenT(!isOpenT);
                }}
                className="flex items-center border border-Primary p-2 rounded-lg cursor-pointer"
              >
                <div className="flex items-center  gap-2">
                  <img src={WebIcons.dashboardTranslate} alt="translate ico" />
                  <span className="font-medium">
                    {language === "English" ? "English" : "Polish"}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isOpenT ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpenT && (
                <>
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-blue-500 rounded-md shadow-lg z-20 overflow-hidden">
                    {languageList.map((ln, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsOpenT(false);
                          setLanguage(ln);
                        }}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-150 ${
                          language === "en" ? "text-blue-600" : "text-gray-600"
                        }`}
                      >
                        {ln}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="relative">
              {/* Dropdown Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between min-w-[120px] px-4 py-2 border border-blue-500 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-600" />
                  <span className="font-medium">{selectedYear}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <>
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-blue-500 rounded-md shadow-lg z-20 overflow-hidden">
                    {years.map((year, index) => (
                      <button
                        key={year.value}
                        onClick={() => handleSelect(year.value)}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-150 ${
                          selectedYear === year.value
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        <Calendar
                          size={16}
                          className={
                            selectedYear === year.value
                              ? "text-blue-600"
                              : "text-gray-600"
                          }
                        />
                        <span className="font-medium">{year.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Backdrop to close dropdown */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsOpen(false)}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Show months with background image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {months.map((month, index) => (
            <div
              onClick={() => {
                setSelectedMonth(index);
                setShowDashboard(true);
              }}
              key={index}
              className=" h-50 border rounded-lg flex items-center justify-center capitalize text-white font-bold text-xl shadow-lg cursor-pointer"
              style={{
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${WebIcons.monthBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span>
                {month}
                {console.log(index)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Dashboard
        setShowDashboard={setShowDashboard}
        selectedMonth={selectedMonth}
      />
    );
  }
};

export default MonthlySch;
