import React, { useState } from "react";
import { Search, MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";

const initialData = [
  { id: "FIG-121", title: "The maximum working time in a month is 180 hours" },
  { id: "FIG-122", title: "We are closed on Sundays" },
  {
    id: "FIG-123",
    title:
      "During the holiday period (July and August), the maximum shift length is 6 hours",
  },
  {
    id: "FIG-124",
    title: "Standard workweek is 40 hours, with possible overtime",
  },
  {
    id: "FIG-125",
    title:
      "Employees are entitled to short breaks (15 mins) and longer breaks for shifts over 6 hours",
  },
  {
    id: "FIG-126",
    title:
      "During the holiday period (July and August), the maximum shift length is 6 hours",
  },
  {
    id: "FIG-127",
    title: "Shifts usually last 8 hours, but can be shorter or longer",
  },
  {
    id: "FIG-128",
    title: "Flexible work hours or remote work may be offered in some roles",
  },
  { id: "FIG-129", title: "Employees earn paid vacation time annually" },
  {
    id: "FIG-130",
    title: "Employees may rotate between day, evening, or night shifts",
  },
];

const PrinciplesTable = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [openActionId, setOpenActionId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [principles, setPrinciples] = useState(initialData);
  const [newRule, setNewRule] = useState("");

  const filteredData = principles.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActionMenu = (id) => {
    setOpenActionId(openActionId === id ? null : id);
  };

  const handleEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditValue(currentTitle);
    setOpenActionId(null);
  };

  const handleSave = (id) => {
    if (!editValue.trim()) return;
    setPrinciples((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, title: editValue.trim() } : item
      )
    );
    setEditingId(null);
    setEditValue("");
  };

  const handleDelete = (id) => {
    
      setPrinciples((prev) => prev.filter((item) => item.id !== id));
      setOpenActionId(null);
    
  };

  const handleAddRule = () => {
    if (!newRule.trim()) return;
    const newId = `FIG-${Math.floor(Math.random() * 1000) + 131}`;
    const newItem = { id: newId, title: newRule.trim() };
    setPrinciples([...principles, newItem]);
    setNewRule("");
  };

  return (
    <div className="max-w-8xl p-6 mt-10 bg-white  rounded-md font-Roboto">
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

      <div className="overflow-y-auto max-h-[420px]">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-left font-medium">
              <th className="py-2 px-2 w-24 text-[#828282]">
                {t("schedule.task")}
              </th>
              <th className="py-2 px-2 text-textClr font-medium">
                {t("schedule.title")}
              </th>
              <th className="py-2 px-2">{t("schedule.action")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-[#E0E0E0] hover:bg-gray-50 relative text-sm"
              >
                <td className="py-2 px-2 text-[#828282]">{item.id}</td>
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

