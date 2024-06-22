'use client';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getContentHistories } from '@/services/contentHistoryService';
import { ContentHistoryResponseDTO } from '@/types/contentHistory';
import ContentHistoryForm from '../../components/contentHistory/ContentHistoryForm';
import withAuth from "@/components/withAuth";

const ContentHistories: NextPage = () => {
    const [contentHistories, setContentHistories] = useState<ContentHistoryResponseDTO[]>([]);

    useEffect(() => {
        async function fetchContentHistories() {
            const data = await getContentHistories();
            setContentHistories(data);
        }
        fetchContentHistories();
    }, []);

    return (
        <div>
            <h1>Content Histories</h1>
            <ContentHistoryForm />
            <ul>
                {contentHistories.map(history => (
                    <li key={history.changeId}>
                        <Link href={`/content-histories/${history.changeId}`}>{history.changeDescription}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default withAuth(ContentHistories);
