import React, { useEffect, useState } from "react";
import { Search, MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import baseApi from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endPoints";
import { getToken } from "../../utils/helper";
const PrinciplesTable = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [openActionId, setOpenActionId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [principles, setPrinciples] = useState([]);
  const [newRule, setNewRule] = useState("");
  const token = getToken(import.meta.env.VITE_ACCESS_TOKEN_KEY);

  const filteredData = principles.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.task.includes(search.toLowerCase())
  );

  const toggleActionMenu = (id) => {
    setOpenActionId(openActionId === id ? null : id);
  };

  const handleEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditValue(currentTitle);
    setOpenActionId(null);
  };

  const handleSave = async (id) => {
    if (!editValue.trim()) return;

    try {
      const res = await baseApi.patch(
        ENDPOINTS.SCHEDULE + id + "/",
        {
          title: editValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Updated Successfully");
      }
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

    setPrinciples((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, title: editValue.trim() } : item
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  const handleDelete = async (id) => {
    try {
      const res = await baseApi.delete(ENDPOINTS.SCHEDULE + id + "/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 204) {
        setPrinciples((prev) => prev.filter((item) => item.id !== id));
        setOpenActionId(null);
        return toast.success("Delete Success");
      }
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
    // setPrinciples((prev) => prev.filter((item) => item.id !== id));
    // setOpenActionId(null);
    // const x = () => {
    //   return principles.filter((item) => item.id !== id);
    // };
    // console.log(x);
  };

  const handleAddRule = async () => {
    try {
      const res = await baseApi.post(
        ENDPOINTS.SCHEDULE,
        {
          title: newRule,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // status not 201
      if (res.status !== 201)
        return toast.error("Any problem to adding new schedule");

      // status 201
      if (res.status === 201) {
        toast.success("New rule created");
        setPrinciples((prev) => [...prev, res.data]);
      }
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

  const getScheduleList = async () => {
    try {
      const res = await baseApi.get(ENDPOINTS.SCHEDULE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPrinciples(res.data);
      console.log(res.status);
      console.log(res.data);
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

  // Run every render
  useEffect(() => {
    getScheduleList();
  }, [token]);

  return (
    <div className="max-w-8xl p-6 mt-10 bg-white rounded-md font-Roboto">
      <div className="sticky top-0 z-20 bg-white pb-4">
        <h2 className="text-xl font-semibold text-textClr mb-4">
          {t("schedule.principles")}
        </h2>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full md:max-w-[405px]">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder={t("schedule.searchPlaceholder")}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded w-full outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="my-6 overflow-x-auto">
        <div className="flex flex-wrap gap-4 justify-end w-full min-w-[300px] sm:w-auto">
          <input
            type="text"
            placeholder={t("schedule.addNewRule")}
            className="py-2 px-3 border border-gray-300 rounded w-full sm:w-96 outline-none"
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
          />
          <button
            onClick={handleAddRule}
            className="bg-[#F7F7F7] rounded px-3 py-2 flex items-center gap-x-2 w-max"
          >
            <span className="w-5 h-5 border rounded-full flex items-center justify-center text-lg font-bold leading-none">
              +
            </span>
            {t("schedule.addNew")}
          </button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[420px] min-h-[200px]">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-left font-medium">
              <th className="py-2 px-2 w-[100px] text-[#828282]">
                {t("schedule.task")}
              </th>
              <th className="py-2 px-2 text-textClr font-medium">
                {t("schedule.title")}
              </th>
              <th className="py-2 px-2 w-[120px] text-right">
                {t("schedule.action")}
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-[#E0E0E0] hover:bg-gray-50 relative text-sm"
              >
                <td className="py-2 px-2 text-[#828282]">{item.task}</td>
                <td className="py-2 px-2">
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border border-gray-300 px-2 py-1 rounded w-full"
                    />
                  ) : (
                    item.title
                  )}
                </td>
                <td className="py-2 px-2 relative">
                  {editingId === item.id ? (
                    <button
                      onClick={() => handleSave(item.id)}
                      className="bg-blue-600 text-sm text-white  px-2 py-1 rounded cursor-pointer"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button onClick={() => toggleActionMenu(item.id)}>
                        <MoreVertical className="text-gray-500" size={18} />
                      </button>
                      {openActionId === item.id && (
                        <div className="absolute right-2 mt-2 bg-white border border-gray-200 rounded shadow w-28 z-10">
                          <button
                            onClick={() => handleEdit(item.id, item.title)}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {t("schedule.edit")}
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            {t("schedule.delete")}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrinciplesTable;
