import {Metadata} from 'next';
import {getReviewById} from '../../../services/reviewService';

interface ReviewDetailProps {
    params: {
        reviewId: string;
    };
}

export async function generateMetadata({ params }: ReviewDetailProps): Promise<Metadata> {
    const review = await getReviewById(parseInt(params.reviewId, 10));
    return { title: `Review by ${review.reviewedBy.username}` };
}

export default async function ReviewDetail({ params }: ReviewDetailProps) {
    const review = await getReviewById(parseInt(params.reviewId, 10));

    if (!review) {
        return <div>Review not found</div>;
    }

    return (
        <div>
            <h1>Review ID: {review.reviewId}</h1>
            <p>Feedback: {review.feedback}</p>
            <p>Status: {review.status}</p>
            <p>Reviewed by: {review.reviewedBy.username}</p>
        </div>
    );
}
