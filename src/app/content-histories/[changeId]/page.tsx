import { Metadata } from 'next';
import { ContentHistoryResponseDTO } from '../../../types/contentHistory';
import { getContentHistoryById } from '../../../services/contentHistoryService';

interface ContentHistoryDetailProps {
    params: {
        changeId: string;
    };
}

export async function generateMetadata({ params }: ContentHistoryDetailProps): Promise<Metadata> {
    const history = await getContentHistoryById(parseInt(params.changeId, 10));
    return { title: `Change ID: ${history.changeId}` };
}

export default async function ContentHistoryDetail({ params }: ContentHistoryDetailProps) {
    const history = await getContentHistoryById(parseInt(params.changeId, 10));

    if (!history) {
        return <div>Content history not found</div>;
    }

    return (
        <div>
            <h1>Change ID: {history.changeId}</h1>
            <p>Change Date: {history.changeDate}</p>
            <p>Change Description: {history.changeDescription}</p>
            <p>Modified by: {history.modifiedBy.username}</p>
        </div>
    );
}
