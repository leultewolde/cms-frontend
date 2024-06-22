'use client';
import {getTaskById} from '@/services/taskService';
import {useEffect, useState} from "react";
import {TaskResponseDTO} from "@/types/task";

interface TaskDetailProps {
    params: {
        taskId: string;
    };
}

export default function TaskDetail({params}: TaskDetailProps) {
    const [task, setTask] = useState<TaskResponseDTO>();

    useEffect(() => {
        getTaskById(parseInt(params.taskId, 10))
            .then(t => setTask(t));
    }, [params.taskId]);

    if (!task) {
        return <div>Task not found</div>;
    }

    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-white">Task Information</h3>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-white">Task Name</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-100 sm:col-span-2 sm:mt-0">{task.title}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-white">Task Description</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-100 sm:col-span-2 sm:mt-0">{task.description}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-white">Status</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-100 sm:col-span-2 sm:mt-0">{task.status}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-white">Deadline</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-100 sm:col-span-2 sm:mt-0">{task.deadline}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-white">Assigned To</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-100 sm:col-span-2 sm:mt-0">{task.assignedTo ? task.assignedTo.username : "Err"}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-white">To be published On</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-100 sm:col-span-2 sm:mt-0">{task.targetPlatforms.map(p => p.platformName).join(", ")}</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}
