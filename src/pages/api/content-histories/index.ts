import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';
import { ContentHistoryResponseDTO } from '../../../types/contentHistory';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const response = await api.get<ContentHistoryResponseDTO[]>('/content-histories');
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching content histories' });
        }
    } else if (req.method === 'POST') {
        try {
            const response = await api.post<ContentHistoryResponseDTO>('/content-histories', req.body);
            res.status(201).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error creating content history' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};