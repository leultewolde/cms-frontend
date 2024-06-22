'use client';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getReviews } from '@/services/reviewService';
import { ReviewResponseDTO } from '@/types/review';
import ReviewForm from '../../components/review/ReviewForm';
import withAuth from "@/components/withAuth";

const Reviews: NextPage = () => {
    const [reviews, setReviews] = useState<ReviewResponseDTO[]>([]);

    useEffect(() => {
        async function fetchReviews() {
            const data = await getReviews();
            setReviews(data);
        }
        fetchReviews();
    }, []);

    return (
        <div>
            <h1>Reviews</h1>
            <ReviewForm />
            <ul>
                {reviews.map(review => (
                    <li key={review.reviewId}>
                        <Link href={`/reviews/${review.reviewId}`}>{review.feedback}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default withAuth(Reviews);
