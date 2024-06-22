import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';
import { TaskQueueResponseDTO } from '../../../types/taskQueue';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const response = await api.get<TaskQueueResponseDTO[]>('/task-queues');
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching task queues' });
        }
    } else if (req.method === 'POST') {
        try {
            const response = await api.post<TaskQueueResponseDTO>('/task-queues', req.body);
            res.status(201).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error creating task queue' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
