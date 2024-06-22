import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';
import { UserResponseDTO } from '../../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username } = req.query;

    if (req.method === 'GET') {
        try {
            const response = await api.get<UserResponseDTO>(`/users/${username}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user' });
        }
    } else if (req.method === 'PUT') {
        try {
            const response = await api.put<UserResponseDTO>(`/users/${username}`, req.body);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user' });
        }
    } else if (req.method === 'DELETE') {
        try {
            await api.delete(`/users/${username}`);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
