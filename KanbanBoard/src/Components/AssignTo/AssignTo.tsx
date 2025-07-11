import React, { useEffect, useState } from "react";
import { Assignee } from "../../AssigneeData/Assignee";
import Cancel from "../Cancel/Cancel";

interface AssignToProps {
  isOpen: boolean;
  onMemberModalClose: () => void;
  onSelect: (assignees: { name: string; email: string; profilePicture: string }[]) => void;
  initialSelected?: { name: string; email: string; profilePicture: string }[];
}

const AssignTo: React.FC<AssignToProps> = ({
  isOpen,
  onMemberModalClose,
  onSelect,
  initialSelected = [],
}) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  
  useEffect(() => {
    if (isOpen) {
      setSelected(initialSelected.map((assignee) => assignee.profilePicture));
    }
  }, [isOpen, initialSelected]);

  if (!isOpen) return null;

  const filteredAssignees = Assignee.filter((assign) =>
    assign.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (profilePicture: string) => {
    setSelected((prev) =>
      prev.includes(profilePicture)
        ? prev.filter((img) => img !== profilePicture)
        : [...prev, profilePicture]
    );
  };

  const handleConfirm = () => {
    const selectedAssignees = Assignee.filter((a) =>
      selected.includes(a.profilePicture)
    );
    onSelect(selectedAssignees);
    onMemberModalClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-100">
      <div className="bg-white p-6 rounded-lg shadow-lg sm:w-full w-[90vw] max-w-md relative">
        <div className="head flex justify-between items-center lg:mb-4 sm:mb-3 mb-2">
          <h1 className="lg:text-xl sm:text-base text-sm font-semibold">Assign</h1>
          <Cancel onClose={onMemberModalClose} />
        </div>

        <div className="search lg:mb-4 sm:mb-3 mb-2">
          <input
            type="text"
            className="border w-full lg:px-3 lg:py-2 sm:px-3 sm:py-1.5 px-2 py-1 rounded sm:placeholder:text-base placeholder:text-sm"
            placeholder="Search Members"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="members space-y-2">
          <h3 className="lg:text-xl sm:text-base text-sm font-semibold text-zinc-600">Members</h3>
          <div className="h-[50vh] overflow-y-auto">
            {filteredAssignees.length > 0 ? (
              filteredAssignees.map((assign, index) => {
                const isSelected = selected.includes(assign.profilePicture);
                return (
                  <div
                    key={index}
                    className={`border p-2 rounded cursor-pointer mb-3 flex gap-3 items-center ${isSelected ? "bg-blue-100" : "hover:bg-gray-100"
                      }`}
                    onClick={() => toggleSelect(assign.profilePicture)}
                  >
                    <img
                      src={assign.profilePicture}
                      alt="picture"
                      className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 rounded-full"
                    />
                    <div>
                      <h1 className="font-medium lg:text-base sm:text-sm text-[12px]">{assign.name}</h1>
                      <h2 className="lg:text-sm sm:text-[12px] text-[10px] text-zinc-500">{assign.email}</h2>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No Members Found</p>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onMemberModalClose}
            className="lg:text-base sm:text-sm text-[12px] lg:px-4 lg:py-2 sm:px-3 sm:py-1.5 px-2 py-1 border rounded hover:bg-zinc-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="lg:text-base sm:text-sm text-[12px] lg:px-4 lg:py-2 sm:px-3 sm:py-1.5 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Assign ({selected.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTo;
