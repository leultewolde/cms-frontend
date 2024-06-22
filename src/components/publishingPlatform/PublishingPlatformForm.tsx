import React, {useState} from 'react';
import {createPublishingPlatform} from '@/services/publishingPlatformService';
import {PublishingPlatformRequestDTO} from '@/types/publishingPlatform';

interface PublishingPlatformFormProps {
    setRefreshing: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const PublishingPlatformForm = ({setRefreshing}: PublishingPlatformFormProps) => {
    const [platformName, setPlatformName] = useState('');
    const [APIIntegrationDetails, setAPIIntegrationDetails] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newPlatform: PublishingPlatformRequestDTO = {
            platformName,
            "api_integration_details": APIIntegrationDetails
        };
        if (!newPlatform.platformName || newPlatform.platformName.length === 0) {
            alert('Platform name is required');
            return false;
        }
        try {
            await createPublishingPlatform(newPlatform);
            // Reset form
            setPlatformName('');
            setAPIIntegrationDetails('');
            setRefreshing(true);
        } catch (error) {
            console.error('Error creating publishing platform:', error);
        }
    };

    return (
        <div className="mt-5 sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="platform-name" className="block text-sm font-medium leading-6 text-white">
                        Platform Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="platform-name"
                            name="platform-name"
                            type="text"
                            autoComplete="off"
                            aria-autocomplete="none"
                            required
                            value={platformName}
                            onChange={(e) => setPlatformName(e.target.value)}
                            placeholder="Enter Platform Name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="api-details" className="block text-sm font-medium leading-6 text-white">
                            API Integration Details
                        </label>
                    </div>
                    <div className="mt-2">
                <textarea
                    id="api-details"
                    name="api-details"
                    placeholder="Enter API Integration Details"
                    autoComplete="off"
                    aria-autocomplete="none"
                    value={APIIntegrationDetails}
                    onChange={(e) => setAPIIntegrationDetails(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Publishing Platform
                    </button>
                </div>
            </form>
        </div>
    )
        ;
};

export default PublishingPlatformForm;
