import { Metadata } from 'next';
import { TaskQueueResponseDTO } from '../../../types/taskQueue';
import { getTaskQueueById } from '../../../services/taskQueueService';

interface TaskQueueDetailProps {
    params: {
        queueId: string;
    };
}

export async function generateMetadata({ params }: TaskQueueDetailProps): Promise<Metadata> {
    const taskQueue = await getTaskQueueById(parseInt(params.queueId, 10));
    return { title: `Task Queue ID: ${taskQueue.queueId}` };
}

export default async function TaskQueueDetail({ params }: TaskQueueDetailProps) {
    const taskQueue = await getTaskQueueById(parseInt(params.queueId, 10));

    if (!taskQueue) {
        return <div>Task queue not found</div>;
    }

    return (
        <div>
            <h1>Task Queue ID: {taskQueue.queueId}</h1>
            <ul>
                {taskQueue.tasks.map(task => (
                    <li key={task.taskId}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
}
