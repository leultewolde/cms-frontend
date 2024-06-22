export interface PublishingPlatformRequestDTO {
    platformName: string;
    api_integration_details: string;
}

export interface PublishingPlatformResponseDTO {
    platformId: number;
    platformName: string;
    api_integration_details: string;
}
