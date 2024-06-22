import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';
import { PublishingPlatformResponseDTO } from '../../../types/publishingPlatform';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const response = await api.get<PublishingPlatformResponseDTO[]>('/publishing-platforms');
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching publishing platforms' });
        }
    } else if (req.method === 'POST') {
        try {
            const response = await api.post<PublishingPlatformResponseDTO>('/publishing-platforms', req.body);
            res.status(201).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error creating publishing platform' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
