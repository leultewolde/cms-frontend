import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';
import { UserResponseDTO } from '../../../types/user';

export default async function users(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const response = await api.get<UserResponseDTO[]>('/users');
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
