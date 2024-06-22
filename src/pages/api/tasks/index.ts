import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';
import { TaskResponseDTO } from '../../../types/task';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const response = await api.get<TaskResponseDTO[]>('/tasks');
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching tasks' });
        }
    } else if (req.method === 'POST') {
        try {
            const response = await api.post<TaskResponseDTO>('/tasks', req.body);
            res.status(201).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error creating task' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
