import { Metadata } from 'next';
import { PublishingPlatformResponseDTO } from '../../../types/publishingPlatform';
import { getPublishingPlatformById } from '../../../services/publishingPlatformService';

interface PlatformDetailProps {
    params: {
        platformId: string;
    };
}

export async function generateMetadata({ params }: PlatformDetailProps): Promise<Metadata> {
    const platform = await getPublishingPlatformById(parseInt(params.platformId, 10));
    return { title: platform.platformName };
}

export default async function PlatformDetail({ params }: PlatformDetailProps) {
    const platform = await getPublishingPlatformById(parseInt(params.platformId, 10));

    if (!platform) {
        return <div>Platform not found</div>;
    }

    return (
        <div>
            <h1>{platform.platformName}</h1>
            <p>API Integration Details: {platform.APIIntegrationDetails}</p>
        </div>
    );
}
