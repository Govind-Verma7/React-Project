import { useDraggable } from "@dnd-kit/core";
import { Task } from "../../context/TaskContext";
interface TaskCardProps {
  task: Task;
  index: number;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${task.id}|${task.status}`,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    transition: "transform 200ms ease",
    touchAction: 'none'
  };

  return (
    <div
      style={style}
      onClick={onClick}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="border border-zinc-400 rounded sm:p-2 p-1 bg-white md:my-5 my-3 cursor-pointer hover:bg-green-100 hover:scale-102 hover:shadow-2xl shadow-xl sm:mx-2 mx-1"
    >
      <p className="xl:text-lg sm:text-sm text-[10px] font-semibold">{task.name}</p>
      <p className="xl:text-[12px] sm:text-[10px] text-[8px]">{task.description}</p>
      <div className="flex gap-1 mt-2 flex-wrap">
        {task.assignee.map((assigneeUrl, i) => (
          <img
            key={i}
            src={assigneeUrl}
            alt={`assignee-${i}`}
            className="xl:h-8 xl:w-8 md:h-6 md:w-6 sm:h-5 sm:w-5 h-3 w-3 rounded-full object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
