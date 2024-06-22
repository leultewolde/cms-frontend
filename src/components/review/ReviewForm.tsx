import React, { useState } from 'react';
import { createReview } from '@/services/reviewService';
import { ReviewRequestDTO } from '@/types/review';
import {ReviewStatus} from "@/types/enums";

const ReviewForm = () => {
    const [feedback, setFeedback] = useState('');
    const [status, setStatus] = useState<ReviewStatus>(ReviewStatus.PENDING);
    const [reviewedByUserId, setReviewedByUserId] = useState<number>(1);
    const [contentId, setContentId] = useState<number>(1);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newReview: ReviewRequestDTO = { feedback, status, reviewedByUserId, contentId };
        try {
            await createReview(newReview);
            // Reset form
            setFeedback('');
            setStatus(ReviewStatus.PENDING);
            setReviewedByUserId(1);
            setContentId(1);
        } catch (error) {
            console.error('Error creating review:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Feedback:</label>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
            </div>
            <div>
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as ReviewStatus)}>
                    <option value={ReviewStatus.PENDING}>Pending</option>
                    <option value={ReviewStatus.APPROVED}>Approved</option>
                    <option value={ReviewStatus.REJECTED}>Rejected</option>
                    <option value={ReviewStatus.REVIEWED}>Reviewed</option>
                </select>
            </div>
            <div>
                <label>Reviewed By User ID:</label>
                <input
                    type="number"
                    value={reviewedByUserId}
                    onChange={(e) => setReviewedByUserId(parseInt(e.target.value, 10))}
                />
            </div>
            <div>
                <label>Content ID:</label>
                <input
                    type="number"
                    value={contentId}
                    onChange={(e) => setContentId(parseInt(e.target.value, 10))}
                />
            </div>
            <button type="submit">Create Review</button>
        </form>
    );
};

export default ReviewForm;
