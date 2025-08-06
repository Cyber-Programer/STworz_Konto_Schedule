import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import WebIcons from "../../assets/images";
import TimePicker from "react-time-picker";
import { useTranslation } from "react-i18next";
import baseApi from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endPoints";
import { toast } from "react-toastify";
const ManageSchedule = ({ setShowManageSchedule }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [monthName, setMonthName] = useState("");
  const [value, setValue] = useState(new Date());
  const token = localStorage.getItem("ACCESS_TOKEN");
  const { t } = useTranslation();

  // useEffect(() => {
  //   if (value instanceof Date && !isNaN(value)) {
  //     const month = value.toLocaleString("default", { month: "long" });
  //     setMonthName(month);
  //   }
  // }, [value]);

  // Use English locale to ensure month names are consistent

  useEffect(() => {
    if (value instanceof Date && !isNaN(value)) {
      const month = value.toLocaleString("default", { month: "long" }); // always get English
      setMonthName(month); // keep it as key
    }
  }, [value]);

  //  Fix date formatting to local date, not UTC
  const handleCalendarChange = (selectedDate) => {
    setValue(selectedDate);

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    console.log(month);

    setDate(formattedDate);
  };

  const handleDateInputChange = (e) => {
    setDate(e.target.value);

    //  Also update calendar selection when typing in input
    const [year, month, day] = e.target.value.split("-");
    const newDate = new Date(year, month - 1, day);
    setValue(newDate);
    // console.log(newDate)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert date from YYYY-MM-DD to DD:MM:YYYY
    let formattedDate = date;
    if (date.includes("-")) {
      const [year, month, day] = date.split("-");
      formattedDate = `${day.padStart(2, "0")}:${month.padStart(
        2,
        "0"
      )}:${year}`;
    }

    // Build shift string (start-end)
    const shift = `${time}-${endTime}`;

    // Prepare payload
    const payload = {
      schedule_entries: [
        {
          employee_name: name,
          date: formattedDate,
          year: Number(formattedDate.split(":")[2]),
          month: monthName.toLowerCase(),
          shift: shift,
        },
      ],
    };

    console.log("Payload sent to API:", payload);

    try {
      // Replace baseApi and ENDPOINTS.DASHBOARD_UPDATE_EDIT with your actual import
      const res = await baseApi.post(ENDPOINTS.DASHBOARD_UPDATE_EDIT, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        toast.success("Schedule added successfully!");
        setShowManageSchedule(false);
        setName("");
        setDate("");
        setTime("");
        setEndTime("");
      } else {
        toast.error(res.data.error || "Failed to add schedule.");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="p-8 font-Roboto cursor-pointer">
      <h1
        onClick={() => {
          setShowManageSchedule(false);
        }}
        className="cursor-pointer mt-4 md:mt-0 flex gap-10 items-center text-[1.75rem] md:text-[2rem] text-textClr font-semibold leading-5.5"
      >
        <img src={WebIcons.scheduleBack} alt="" />
        {t("manageSch.title")}
      </h1>
      {/* Calendar section */}
      <div className="mt-12.5">
        <h1 className="text-2xl">{t(`months.${monthName}`)}</h1>

        <div className="py-2 max-w-[660px]">
          <Calendar
            onChange={handleCalendarChange}
            value={value}
            className="w-full"
          />
        </div>
      </div>

      {/* Create schedule section */}
      <div className="bg-gray-150 border-[1px] border-[#B3B3B3] max-w-[660px] mt-7 rounded-[10px]">
        <form onSubmit={handleSubmit} className="p-5 w-full">
          <h1 className="text-2xl font-semibold text-textClr leading-5.5">
            {t("manageSch.createSchedule")}
          </h1>
          <div className="mt-5.5">
            <label className="block mb-1 leading-5.5 text-xl text-textClr">
              {t("manageSch.name")}
            </label>
            <input
              type="text"
              placeholder={t("manageSch.placeholder.name")}
              value={name}
              className="w-full border-[1px] border-[#E0E0E0] px-4 py-2 outline-none rounded"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-5.5 flex w-full flex-col md:flex-row justify-between gap-2">
            <div className="w-full">
              <label className="block mb-1 leading-5.5 text-lg text-textClr">
                {t("manageSch.dateOfSchedule")}
              </label>
              <input
                type="date"
                value={date}
                className="w-full border-[1px] border-[#E0E0E0] px-4 py-2 outline-none rounded"
                onChange={handleDateInputChange}
                required
              />
            </div>
            <div className="">
              <label className="block mb-1 leading-5.5 text-sm text-gray-600">
                {t("manageSch.startTime")}
              </label>
              <input
                type="time"
                name="startTime"
                value={time}
                className="w-full border-[1px] border-[#E0E0E0] px-4 py-2 outline-none rounded"
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div className="">
              <label className="block mb-1 leading-5.5 text-sm text-gray-600">
                {t("manageSch.endTime")}
              </label>
              <input
                type="time"
                name="endTime"
                value={endTime}
                className="w-full border-[1px] border-[#E0E0E0] px-4 py-2 outline-none rounded"
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>
          {console.log(time)}
          <button className="mt-5.5 cursor-pointer w-max px rounded-md text-white bg-Primary p-4 ">
            {t("manageSch.addSchedule")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageSchedule;
