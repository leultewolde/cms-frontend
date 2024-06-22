import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';
import { TaskResponseDTO } from '../../../types/task';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { taskId } = req.query;

    if (req.method === 'GET') {
        try {
            const response = await api.get<TaskResponseDTO>(`/tasks/${taskId}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching task' });
        }
    } else if (req.method === 'PUT') {
        try {
            const response = await api.put<TaskResponseDTO>(`/tasks/${taskId}`, req.body);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error updating task' });
        }
    } else if (req.method === 'DELETE') {
        try {
            await api.delete(`/tasks/${taskId}`);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting task' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
