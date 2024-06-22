import {PublishingPlatformResponseDTO} from "@/types/publishingPlatform";

export default function PublishingPlatformList({platforms}: { platforms: PublishingPlatformResponseDTO[] }) {
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {platforms.map((platform) => (
                <li key={platform.platformId} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-white">{platform.platformName}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-white">{platform.api_integration_details}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
