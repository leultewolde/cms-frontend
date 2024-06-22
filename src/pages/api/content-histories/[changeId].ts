import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';
import { ContentHistoryResponseDTO } from '../../../types/contentHistory';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { changeId } = req.query;

    if (req.method === 'GET') {
        try {
            const response = await api.get<ContentHistoryResponseDTO>(`/content-histories/${changeId}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching content history' });
        }
    } else if (req.method === 'PUT') {
        try {
            const response = await api.put<ContentHistoryResponseDTO>(`/content-histories/${changeId}`, req.body);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error updating content history' });
        }
    } else if (req.method === 'DELETE') {
        try {
            await api.delete(`/content-histories/${changeId}`);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting content history' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

