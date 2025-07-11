import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import Column from "../Column/Column";
import Header from "../Header/Header";
import { useTaskContext, Task } from '../../context/TaskContext';
import TaskCard from '../TaskCard/TaskCard';

const Board = () => {
    const { tasks, moveTask } = useTaskContext();
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const mouseSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 5, 
        },
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 150,
            tolerance: 5,
        },
    });
 const sensors = useSensors(mouseSensor, touchSensor);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active && over && active.id !== over.id) {
            const [taskId] = String(active.id).split("|");
            const newStatus = over.id as 'To-Do' | 'In Progress' | 'Done';

            if (taskId && newStatus) {
                moveTask(taskId, newStatus);
            }
        }

        setActiveTask(null);
    };

    const handleDragStart = (event: DragStartEvent) => {
        const [taskId] = String(event.active.id).split("|");
        const task = tasks.find(t => t.id === taskId);
        if (task) setActiveTask(task);
    };

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} sensors={sensors}>
            <div className="flex h-screen justify-center items-center flex-col">
                <Header />
                <div className="main grid grid-cols-3 w-full place-items-center py-20">
                    {["To-Do", "In Progress", "Done"].map(status => (
                        <Column key={status} id={status} head={status as any} />
                    ))}
                </div>
                <DragOverlay>
                    {activeTask ? (
                        <div className="w-[105%]">
                            <TaskCard task={activeTask} index={-1} onClick={() => { }} />
                        </div>
                    ) : null}
                </DragOverlay>
            </div>
        </DndContext>
    );
};

export default Board;
