import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../services/api';
import { ReviewResponseDTO } from '../../../types/review';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { reviewId } = req.query;

    if (req.method === 'GET') {
        try {
            const response = await api.get<ReviewResponseDTO>(`/reviews/${reviewId}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching review' });
        }
    } else if (req.method === 'PUT') {
        try {
            const response = await api.put<ReviewResponseDTO>(`/reviews/${reviewId}`, req.body);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Error updating review' });
        }
    } else if (req.method === 'DELETE') {
        try {
            await api.delete(`/reviews/${reviewId}`);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting review' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
