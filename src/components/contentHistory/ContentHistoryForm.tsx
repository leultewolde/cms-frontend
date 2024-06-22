import React, { useState } from 'react';
import { createContentHistory } from '@/services/contentHistoryService';
import { ContentHistoryRequestDTO } from '@/types/contentHistory';

const ContentHistoryForm = () => {
    const [changeDate, setChangeDate] = useState('');
    const [changeDescription, setChangeDescription] = useState('');
    const [contentId, setContentId] = useState<number>(1);
    const [modifiedByUserId, setModifiedByUserId] = useState<number>(1);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newContentHistory: ContentHistoryRequestDTO = { changeDate, changeDescription, contentId, modifiedByUserId };
        try {
            await createContentHistory(newContentHistory);
            // Reset form
            setChangeDate('');
            setChangeDescription('');
            setContentId(1);
            setModifiedByUserId(1);
        } catch (error) {
            console.error('Error creating content history:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Change Date:</label>
                <input
                    type="date"
                    value={changeDate}
                    onChange={(e) => setChangeDate(e.target.value)}
                />
            </div>
            <div>
                <label>Change Description:</label>
                <textarea
                    value={changeDescription}
                    onChange={(e) => setChangeDescription(e.target.value)}
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
            <div>
                <label>Modified By User ID:</label>
                <input
                    type="number"
                    value={modifiedByUserId}
                    onChange={(e) => setModifiedByUserId(parseInt(e.target.value, 10))}
                />
            </div>
            <button type="submit">Create Content History</button>
        </form>
    );
};

export default ContentHistoryForm;
