import React, { useState } from 'react';
import { createContent } from '@/services/contentService';
import { ContentRequestDTO } from '@/types/content';
import {ContentStatus} from "@/types/enums";

const ContentForm = () => {
    const [type, setType] = useState('TEXT');
    const [data, setData] = useState('');
    const [version, setVersion] = useState('1.0');
    const [status, setStatus] = useState<ContentStatus>(ContentStatus.DRAFT);
    const [createdByUserId, setCreatedByUserId] = useState<number>(1);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newContent: ContentRequestDTO = { type, data, version, status, createdByUserId };
        try {
            await createContent(newContent);
            // Reset form
            setType('TEXT');
            setData('');
            setVersion('1.0');
            setStatus(ContentStatus.DRAFT);
            setCreatedByUserId(1);
        } catch (error) {
            console.error('Error creating content:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="TEXT">Text</option>
                    <option value="IMAGE">Image</option>
                    <option value="VIDEO">Video</option>
                </select>
            </div>
            <div>
                <label>Data:</label>
                <textarea
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            </div>
            <div>
                <label>Version:</label>
                <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                />
            </div>
            <div>
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as ContentStatus)}>
                    <option value={ContentStatus.DRAFT}>Draft</option>
                    <option value={ContentStatus.IN_REVIEW}>In Review</option>
                    <option value={ContentStatus.APPROVED}>Approved</option>
                    <option value={ContentStatus.NEEDS_FIXING}>Needs Fixing</option>
                    <option value={ContentStatus.COMPLETED}>Completed</option>
                    <option value={ContentStatus.PUBLISHED}>Published</option>
                </select>
            </div>
            <div>
                <label>Created By User ID:</label>
                <input
                    type="number"
                    value={createdByUserId}
                    onChange={(e) => setCreatedByUserId(parseInt(e.target.value, 10))}
                />
            </div>
            <button type="submit">Create Content</button>
        </form>
    );
};

export default ContentForm;
