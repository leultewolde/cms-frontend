import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {createTask} from '@/services/taskService';
import {TaskRequestDTO} from '@/types/task';
import {TaskStatus} from "@/types/enums";
import usePublishingPlatform from "@/hooks/usePublishingPlatform";
import {useAuth} from "@/contexts/AuthContext";
import username from "@/pages/api/users/[username]";
import {UserResponseDTO} from "@/types/user";

interface TaskFormProps {
    setRefreshing: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const TaskForm = ({setRefreshing}: TaskFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState<TaskStatus>(TaskStatus.ASSIGNED);
    const [username, setUsername] = useState<string>();
    const [targetPlatformIds, setTargetPlatformIds] = useState<number[]>([]);
    const {findUserByUsername} = useAuth();
    const [user, setUser] = useState<UserResponseDTO | null>(null);
    const {platforms} = usePublishingPlatform();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!user) return;
        const newTask: TaskRequestDTO = {title, description, deadline, status, targetPlatformIds, assignedToUserId: user?.userId};
        try {
            await createTask(newTask);
            // Reset form
            setTitle('');
            setDescription('');
            setDeadline('');
            setStatus(TaskStatus.ASSIGNED);
            setUser(null);
            setTargetPlatformIds([]);
            setRefreshing(true);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    useEffect(() => {
        const handleFindUser = async () => {
            if (username) {
                try {
                    const fetchedUser = await findUserByUsername(username);
                    setUser(fetchedUser);
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setUser(null); // Handle error by setting user to null or any appropriate error handling
                }
            }
        };

        handleFindUser();
    }, [findUserByUsername, username]);

    return (
        <div className="mt-5 sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-white">Title</label>
                    <div className="mt-2">
                        <input
                            name="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="description"
                           className="block text-sm font-medium leading-6 text-white">Description</label>
                    <div className="mt-2">
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
                <div>
                    <label htmlFor="deadline"
                           className="block text-sm font-medium leading-6 text-white">Deadline</label>
                    <div className="mt-2">
                        <input
                            name="deadline"
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium leading-6 text-white">Status</label>
                    <div className="mt-2">
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as TaskStatus)}
                            disabled
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            <option value={TaskStatus.ASSIGNED}>Assigned</option>
                            <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                            <option value={TaskStatus.IN_REVIEW}>In Review</option>
                            <option value={TaskStatus.WAITING_FOR_PUBLICATION}>Waiting for Publication</option>
                            <option value={TaskStatus.COMPLETED}>Completed</option>
                            <option value={TaskStatus.SENT_BACK}>Sent Back</option>
                            <option value={TaskStatus.PENDING}>Pending</option>
                            <option value={TaskStatus.CLOSED}>Closed</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="platforms" className="block text-sm font-medium leading-6 text-white">Platforms</label>
                    <div className="mt-2">
                        <select
                            name="platforms"
                            // value={status}
                            onChange={(e) => {
                                    let values:number[] = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                                    setTargetPlatformIds(values);
                            }}
                            multiple
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            {platforms.map(platform => (
                                <option key={platform.platformId} value={platform.platformId}>{platform.platformName}</option>
                            ))}

                        </select>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                            Username
                        </label>
                        {user && <span>{"User: " + user?.username + ", Role: " + user?.role}</span>}
                    </div>
                    <div className="mt-2">
                        <input
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
