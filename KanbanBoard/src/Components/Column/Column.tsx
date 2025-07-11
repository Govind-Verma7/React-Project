import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import TaskForm from "../TaskForm/TaskForm";
import TaskDetail from "../TaskDetail/TaskDetail";
import { useTaskContext } from "../../context/TaskContext";
import { useDroppable } from "@dnd-kit/core";
import "./Column.css";
import TaskCard from "../TaskCard/TaskCard";

interface ColumnProps {
  id: string;
  head: "To-Do" | "In Progress" | "Done";
}

const Column: React.FC<ColumnProps> = ({ head, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModelOpen] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const { tasks } = useTaskContext();

  const { setNodeRef, isOver } = useDroppable({ id });

  const filteredTasks = tasks
    .map((task, index) => ({ task, globalIndex: index }))
    .filter(({ task }) => task.status === head);

  return (
    <div
      className={`lg:w-2/3 w-10/11 bg-zinc-100 rounded shadow-2xl transition-all duration-300 ${isOver ? "outline-2 outline-black" : ""
        }`}
    >
      <div className="heading p-2 shadow-sm">
        <h2 className="md:text-xl sm:text-lg text-sm font-bold text-zinc-700">{head}</h2>
      </div>

      <div className="max-h-[70vh] overflow-y-auto overflow-x-hidden" ref={setNodeRef}>
        {filteredTasks.length === 0 ? (
          <p className="text-center font-semibold lg:text-xl sm:text-sm text-[10px] text-zinc-400 py-5">
            No Tasks Added Yet
          </p>
        ) : (
          filteredTasks.map(({ task, globalIndex }) => (
            <TaskCard
              key={task.id}
              task={task}
              index={globalIndex}
              onClick={() => {
                setSelectedTaskIndex(globalIndex);
                setIsDetailModelOpen(true);
              }}
            />
          ))
        )}
      </div>

      <div
        className="add flex justify-center items-center md:gap-3 gap-2 p-2 cursor-pointer hover:scale-105 shadow-sm"
        onClick={() => { setIsModalOpen(true); }}
      >
        <IoIosAddCircleOutline className="md:text-2xl sm:text-xl text-lg" />
        <p className="md:text-xl sm:text-lg text-[12px] font-semibold text-zinc-700">Add Task</p>
      </div>

      <TaskForm
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={head}
      />
      <TaskDetail
        isDetailModalOpen={isDetailModalOpen}
        onDetailClose={() => setIsDetailModelOpen(false)}
        taskIndex={selectedTaskIndex}
      />
    </div>
  );
};

export default Column;
