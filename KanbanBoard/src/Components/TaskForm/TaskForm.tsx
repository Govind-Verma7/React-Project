import React, { useEffect, useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import AssignTo from "../AssignTo/AssignTo";
import Cancel from "../Cancel/Cancel";
import { Assignee } from "../../AssigneeData/Assignee";

interface TaskFormProps {
    isModalOpen: boolean;
    onClose: () => void;
    status: 'To-Do' | 'In Progress' | 'Done';
    taskToEdit?: {
        name: string;
        description: string;
        assignee: string[];
    };
}

const TaskForm: React.FC<TaskFormProps> = ({ isModalOpen, onClose, status, taskToEdit }) => {
    const { addTask } = useTaskContext();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState<string[]>([]);
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
    const [memberError, setMemberError] = useState(false);

    useEffect(() => {
        if (taskToEdit) {
            setName(taskToEdit.name);
            setDescription(taskToEdit.description);
            setAssignee(taskToEdit.assignee);
        }
    }, [taskToEdit]);

    const selectedAssigneeObjects = Assignee.filter(a =>
        assignee.includes(a.profilePicture)
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (assignee.length === 0) {
            setMemberError(true);
            return;
        } else {
            setMemberError(false)
        }
        addTask({ name, description, assignee, status });
        setName("");
        setDescription("");
        setAssignee([]);
        onClose();
    }
    if (!isModalOpen) return null;

    return (
        <>
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white md:p-6 p-4 rounded-lg shadow-lg md:w-full w-[80vw] max-w-md relative">
                    <Cancel onClose={onClose} />

                    <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block font-medium md:text-base sm:text-sm text-[12px]">
                                Task Name:
                            </label>
                            <input
                                type="text"
                                className="w-full border md:px-3 px-1 md:py-2 py-1 rounded"
                                placeholder="Enter Task"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="desc" className="block font-medium md:text-base sm:text-sm text-[12px]">
                                Description:
                            </label>
                            <textarea
                                id="desc"
                                className="w-full border md:px-3 px-1 md:py-2 py-1 rounded"
                                placeholder="Enter Description"
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="assign" className="block font-medium md:text-base sm:text-sm text-[12px]">
                                Assign To:
                            </label>
                            <div className="flex items-center justify-between gap-2">
                                <div className="assignee border md:px-3 px-1 md:py-2 py-1 rounded w-full bg-gray-100 flex gap-2 overflow-x-auto lg:min-h-13 sm:min-h-10 min-h-8">
                                    {assignee.map((a, i) => (
                                        <img key={i} src={a} alt={`assignee-${i}`} className="lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 rounded-full" />
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className="border lg:px-3 lg:py-2 sm:px-2.5 sm:py-1.5 px-2 py-1 rounded bg-sky-400 hover:bg-sky-500 text-white cursor-pointer"
                                    onClick={() => setIsMemberModalOpen(true)}
                                >
                                    Assign
                                </button>
                            </div>
                            {memberError ? <p className="text-red-500">Choose Assignee</p> : null}
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white lg:px-4 lg:py-2 sm:px-3 sm:py-1.5 px-2 py-1 rounded hover:bg-blue-700 cursor-pointer"
                        >
                            Add Task
                        </button>
                    </form>
                </div>
            </div>
            {isMemberModalOpen && (
                <AssignTo
                    isOpen={isMemberModalOpen}
                    onMemberModalClose={() => setIsMemberModalOpen(false)}
                    onSelect={(selectedAssignee) => {
                        const pictureUrls = selectedAssignee.map(a => a.profilePicture);
                        setAssignee(pictureUrls);
                    }}
                    initialSelected={selectedAssigneeObjects}
                />
            )}
        </>
    );
};

export default TaskForm;
