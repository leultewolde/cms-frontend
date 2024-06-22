'use client';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getTaskQueues } from '@/services/taskQueueService';
import { TaskQueueResponseDTO } from '@/types/taskQueue';
import TaskQueueForm from '../../components/taskQueue/TaskQueueForm';
import withAuth from "@/components/withAuth";

const TaskQueues: NextPage = () => {
    const [taskQueues, setTaskQueues] = useState<TaskQueueResponseDTO[]>([]);

    useEffect(() => {
        async function fetchTaskQueues() {
            const data = await getTaskQueues();
            setTaskQueues(data);
        }
        fetchTaskQueues();
    }, []);

    return (
        <div>
            <h1>Task Queues</h1>
            <TaskQueueForm />
            <ul>
                {taskQueues.map(queue => (
                    <li key={queue.queueId}>
                        <Link href={`/task-queues/${queue.queueId}`}>{queue.queueId}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default withAuth(TaskQueues);
