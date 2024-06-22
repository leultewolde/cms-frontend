'use client';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getContents } from '@/services/contentService';
import { ContentResponseDTO } from '@/types/content';
import ContentForm from '../../components/content/ContentForm';
import withAuth from "@/components/withAuth";

const Contents: NextPage = () => {
    const [contents, setContents] = useState<ContentResponseDTO[]>([]);

    useEffect(() => {
        async function fetchContents() {
            const data = await getContents();
            setContents(data);
        }
        fetchContents();
    }, []);

    return (
        <div>
            <h1>Contents</h1>
            <ContentForm />
            <ul>
                {contents.map(content => (
                    <li key={content.contentId}>
                        <Link href={`/contents/${content.contentId}`}>{content.type}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default withAuth(Contents);
