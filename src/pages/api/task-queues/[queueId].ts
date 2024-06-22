import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';
import { TaskQueueResponseDTO } from '../../../types/taskQueue';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { queueId } = req.query;

    if (req.method === 'GET') {
        try {
            const response = await api.get<TaskQueueResponseDTO>(`/task-queues/${queueId}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching task queue' });
        }
    } else if (req.method === 'PUT') {
        try {
            const response = await api.put<TaskQueueResponseDTO>(`/task-queues/${queueId}`, req.body);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error updating task queue' });
        }
    } else if (req.method === 'DELETE') {
        try {
            await api.delete(`/task-queues/${queueId}`);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting task queue' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
