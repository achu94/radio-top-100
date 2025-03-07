import { StationsResponse, RadioStation } from "../types/stations";

export async function getTopHundert(query?: string, currentPage?: number): Promise<RadioStation[]> {
    try {
        const baseUrl = process.env.STATIONS_API_URL || 'http://localhost:3000';

        const stationsPerPage = 20;
        const count = currentPage ? (currentPage * stationsPerPage) : 100;
        const response = await fetch(`${baseUrl}${currentPage ? '&count=' + count : ""}`);

        if (!response.ok) {
            throw new Error(`Top 100 API is unavailable. Status: ${response.status}`);
        }

        const results: StationsResponse = await response.json();

        if (!results.playables) {
            throw new Error("Invalid response: playables not found");
        }


        if (query) {
            // Filter Stations by searchQuery
            return results.playables.filter(station => station.name.toLowerCase().match(query.toLocaleLowerCase()));
        }
        else if (currentPage) {
            // Pagination logic
            const startIndex = (currentPage - 1) * stationsPerPage;
            return results.playables.slice(startIndex, startIndex + stationsPerPage);
        }

        return results.playables;
    } catch (error) {
        console.error("Failed to fetch top 100 stations:", error);
        return [];
    }
}