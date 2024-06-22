import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';
import { ContentResponseDTO } from '../../../types/content';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { contentId } = req.query;

    if (req.method === 'GET') {
        try {
            const response = await api.get<ContentResponseDTO>(`/contents/${contentId}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching content' });
        }
    } else if (req.method === 'PUT') {
        try {
            const response = await api.put<ContentResponseDTO>(`/contents/${contentId}`, req.body);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error updating content' });
        }
    } else if (req.method === 'DELETE') {
        try {
            await api.delete(`/contents/${contentId}`);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting content' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
