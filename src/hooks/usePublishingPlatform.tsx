import {useEffect, useState} from "react";
import {PublishingPlatformResponseDTO} from "@/types/publishingPlatform";
import {getPublishingPlatforms} from "@/services/publishingPlatformService";

export default function usePublishingPlatform() {
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

    return {platforms, refreshing, setRefreshing};
}