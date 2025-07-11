import { useEffect, useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import AssignTo from "../AssignTo/AssignTo";
import Cancel from "../Cancel/Cancel";
import Swal from 'sweetalert2';
import { Assignee } from "../../AssigneeData/Assignee";

interface TaskDetailProps {
  isDetailModalOpen: boolean;
  onDetailClose: () => void;
  taskIndex: number | null;
}

const TaskDetail: React.FC<TaskDetailProps> = ({
  isDetailModalOpen,
  onDetailClose,
  taskIndex,
}) => {
  const { tasks, removeTask, updateTask } = useTaskContext();
  const [, setEditIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAssignees, setEditAssignees] = useState<{ name: string; email: string; profilePicture: string; }[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  const selectedTask = taskIndex !== null ? tasks[taskIndex] : null;

  useEffect(() => {
    if (selectedTask) {
      setEditName(selectedTask.name);
      setEditDescription(selectedTask.description);

      const matchedAssignees =
        Array.isArray(selectedTask.assignee)
          ? Assignee.filter((a) =>
            selectedTask.assignee.includes(a.profilePicture)
          )
          : [];

      setEditAssignees(matchedAssignees);
    }
  }, [selectedTask]);

  const saveEdit = () => {
    if (taskIndex !== null && selectedTask !== null) {
      updateTask(taskIndex, {
        ...selectedTask,
        name: editName,
        description: editDescription,
        assignee: editAssignees.map((a) => a.profilePicture),
      });
      setEditMode(false);
    }
  };

  if (!isDetailModalOpen || !selectedTask) return null;

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6  rounded-lg shadow-lg sm:w-full w-[90vw] max-w-md relative">
          <div className="lg:mt-6 sm:mt-5 mt-3 space-y-4">
            <div className="border lg:p-4 sm:p-3 p-2 rounded shadow space-y-2">
              {editMode ? (
                <>
                  <Cancel onClose={() => setEditMode(false)} />
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border px-2 py-1 rounded w-full lg:text-base sm:text-sm text-[12px]"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="border px-2 py-1 rounded w-full lg:text-base sm:text-sm text-[12px]"
                  />
                  <div className="flex items-center sm:gap-2 gap-1 flex-wrap">
                    {editAssignees.map((user, idx) => (
                      <img
                        key={idx}
                        src={user.profilePicture}
                        alt="assignee"
                        className="lg:h-10 lg:w-10 sm:h-6 sm:w-6 h-4 w-4 rounded-full"
                      />
                    ))}
                    <button
                      type="button"
                      className="border lg:px-3 lg:py-2 sm:px-2 sm:py-1 px-1.5 py-0.5 lg:text-base text-sm rounded bg-sky-400 hover:bg-sky-500 text-white cursor-pointer"
                      onClick={() => setIsMemberModalOpen(true)}
                    >
                      Assign
                    </button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-500 text-white lg:px-3 lg:py-2 sm:px-2 sm:py-1 px-1.5 py-0.5 lg:text-base text-sm rounded hover:bg-green-600 cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditIndex(null);
                        setEditMode(false);
                      }}
                      className="bg-gray-300 lg:px-3 lg:py-2 sm:px-2 sm:py-1 px-1.5 py-0.5 lg:text-base text-sm rounded hover:bg-gray-400 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Cancel onClose={onDetailClose} />
                  <p className="lg:text-base sm:text-sm text-[12px]">
                    <strong>Task:</strong> {selectedTask.name}
                  </p>
                  <p className="lg:text-base sm:text-sm text-[12px]">
                    <strong>Description:</strong> {selectedTask.description}
                  </p>
                  <p className="flex gap-2 flex-wrap items-center">
                    <strong className="lg:text-base sm:text-sm text-[12px]">Assignees:</strong>
                    {Array.isArray(selectedTask.assignee)
                      ? selectedTask.assignee.map((pic: string, idx: number) => (
                        <img
                          key={idx}
                          src={pic}
                          alt="assignee"
                          className="lg:h-10 lg:w-10 sm:h-6 sm:w-6 h-4 w-4 rounded-full"
                        />
                      ))
                      : selectedTask.assignee && (
                        <img
                          src={selectedTask.assignee}
                          alt="assignee"
                          className="lg:h-10 lg:w-10 sm:h-6 sm:w-6 h-4 w-4 rounded-full"
                        />
                      )}
                  </p>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setEditMode(true)}
                      className="border lg:px-4 lg:py-2 sm:px-3 sm:py-1 px-2 py-0.5 lg:text-base sm:text-sm text-[10px] rounded hover:bg-yellow-100 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: 'Are you sure?',
                          text: "This task will be Removed permanently!",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#d33',
                          cancelButtonColor: '#3085d6',
                          confirmButtonText: 'Yes, remove it!',
                        }).then((result) => {
                          if (result.isConfirmed && taskIndex !== null) {
                            removeTask(Number(taskIndex));
                            onDetailClose();
                            Swal.fire('Removed!', 'Your task has been removed.', 'success');
                          }
                        });
                      }}
                      className="border lg:px-4 lg:py-2 sm:px-3 sm:py-1 px-2 py-0.5 lg:text-base sm:text-sm text-[10px] rounded hover:bg-red-100 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMemberModalOpen && (
        <AssignTo
          isOpen={isMemberModalOpen}
          onMemberModalClose={() => setIsMemberModalOpen(false)}
          onSelect={(selectedAssignees) => {
            setEditAssignees(selectedAssignees);
            setIsMemberModalOpen(false);
          }}
          initialSelected={editAssignees}
        />
      )}
    </>
  );
};

export default TaskDetail;
