'use client';
import {NextPage} from 'next';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {getPublishingPlatforms} from '@/services/publishingPlatformService';
import {PublishingPlatformResponseDTO} from '@/types/publishingPlatform';
import PublishingPlatformForm from '../../components/publishingPlatform/PublishingPlatformForm';
import withAuth from "@/components/withAuth";
import PublishingPlatformList from "@/components/publishingPlatform/PublishingPlatformList";

const PublishingPlatforms: NextPage = () => {
    const [platforms, setPlatforms] = useState<PublishingPlatformResponseDTO[]>([]);
    const [refreshing, setRefreshing] = useState(false)
    useEffect(() => {
        async function fetchPlatforms() {
            const data = await getPublishingPlatforms();
            setPlatforms(data);
            setRefreshing(false);
        }

        fetchPlatforms();
    }, [refreshing]);

    return (
        <div style={{display: "flex", flexDirection: "row",justifyContent: "center", gap: 45}}>
            <PublishingPlatformForm setRefreshing={setRefreshing}/>
            <div>
                <h1>Publishing Platforms</h1>
                <PublishingPlatformList platforms={platforms}/>
            </div>
        </div>
    );
};

export default withAuth(PublishingPlatforms);

