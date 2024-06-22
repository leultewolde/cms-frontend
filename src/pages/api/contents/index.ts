import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';
import { ContentResponseDTO } from '../../../types/content';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const response = await api.get<ContentResponseDTO[]>('/contents');
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching contents' });
        }
    } else if (req.method === 'POST') {
        try {
            const response = await api.post<ContentResponseDTO>('/contents', req.body);
            res.status(201).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error creating content' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
