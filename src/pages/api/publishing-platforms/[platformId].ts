import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';
import { PublishingPlatformResponseDTO } from '../../../types/publishingPlatform';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { platformId } = req.query;

    if (req.method === 'GET') {
        try {
            const response = await api.get<PublishingPlatformResponseDTO>(`/publishing-platforms/${platformId}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching publishing platform' });
        }
    } else if (req.method === 'PUT') {
        try {
            const response = await api.put<PublishingPlatformResponseDTO>(`/publishing-platforms/${platformId}`, req.body);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error updating publishing platform' });
        }
    } else if (req.method === 'DELETE') {
        try {
            await api.delete(`/publishing-platforms/${platformId}`);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting publishing platform' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
