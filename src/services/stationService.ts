import { RadioStationDetails } from "@/lib/types/stations";

export async function fetchStationDetails(stationId: string): Promise<RadioStationDetails> {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/station/${stationId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch station details');
    }

    const stationDetails = await response.json();

    return stationDetails;
}