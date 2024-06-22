'use client';
import {getContentById} from '../../../services/contentService';

interface ContentDetailProps {
    params: {
        contentId: string;
    };
}

export default async function ContentDetail({params}: ContentDetailProps) {
    const content = await getContentById(parseInt(params.contentId, 10));

    if (!content) {
        return <div>Content not found</div>;
    }

    return (
        <div>
            <h1>{content.type}</h1>
            <p>Data: {content.data}</p>
            <p>Status: {content.status}</p>
            <p>Version: {content.version}</p>
            <p>Created by: {content.createdBy.username}</p>
        </div>
    );
}
