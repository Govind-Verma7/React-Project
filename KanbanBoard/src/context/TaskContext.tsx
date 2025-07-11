import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface Task {
    id: string;
    name: string;
    description: string;
    assignee: string[];
    status: 'To-Do' | 'In Progress' | 'Done';
}

interface TaskContextType {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    addTask: (task: Omit<Task, 'id'>) => void;
    removeTask: (index: number) => void;
    updateTask: (index: number, updatedTask: Task) => void;
    moveTask: (taskId: string, newStatus: Task['status']) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTaskContext must be used within TaskProvider");
    return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const local = localStorage.getItem("tasks");
        return local ? JSON.parse(local) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task: Omit<Task, 'id'>) => {
        const newTask: Task = { ...task, id: Date.now().toString() };
        setTasks((prev) => [...prev, newTask]);
        toast.success("Task added successfully!");
    };

    const removeTask = (index: number) => {
        setTasks((prev) => prev.filter((_, i) => i !== index));
        toast.success("Task removed!");
    };

    const updateTask = (index: number, updatedTask: Task) => {
        setTasks(prev => {
            const newTasks = [...prev];
            newTasks[index] = updatedTask;
            return newTasks;
        });
        toast.success('Task updated!');
    };

    const moveTask = (taskId: string, newStatus: Task['status']) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, setTasks, addTask, removeTask, updateTask, moveTask }}>
            {children}
        </TaskContext.Provider>
    );
};
