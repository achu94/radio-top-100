import { StationsResponse, RadioStation } from "../types/stations";

export async function getTopHundert(): Promise<RadioStation[]> {
    try {
        const baseUrl = process.env.STATIONS_API_MOCK || 'http://localhost:3000';
        const response = await fetch(baseUrl);

        if (!response.ok) {
            throw new Error(`Top 100 API is unavailable. Status: ${response.status}`);
        }

        const stationResponse: StationsResponse = await response.json();

        if (!stationResponse.playables) {
            throw new Error("Invalid response: playables not found");
        }

        return stationResponse.playables;
    } catch (error) {
        console.error("Failed to fetch top 100 stations:", error);
        return [];
    }
}