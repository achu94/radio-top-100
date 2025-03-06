import { fetchStationDetails } from "@/services/stationService";
import { PlayerControls } from "@/components/ui/media/PlayerControls";

// invalidate every hour
export const revalidate = 3600;

export default async function Page({
    params
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;

    const station = await fetchStationDetails(id);
    const stationDetails = station.stationDetails[0];
    return (
        <div className="flex flex-col gap-2 items-center min-h-screen p-4 bg-gray-900">
            {/* Logo with hover effect */}
            <div className="mx-auto rounded-2xl transition-transform duration-300 hover:scale-105">
                <PlayerControls stationId={id} imageUrl={stationDetails.logo300x300} imageSize={200} streamUrl={stationDetails.streams[0].url} />
            </div>

            {/* Station Info */}
            <div className="space-y-6 text-center">
                {/* Name with gradient text */}
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {stationDetails.name}
                </h1>

                {/* Genres as badges */}
                <div className="flex flex-wrap justify-center gap-2">
                    {stationDetails.genres?.map((genre, index) => (
                        <span
                            key={`${id}-genre-${index}`}
                            className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                            {genre}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <div className="text-gray-400 text-lg text-left leading-relaxed max-w-prose">
                    {/* Überschrift */}
                    <p className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Description
                    </p>

                    {/* Beschreibungstext mit Scrollbar */}
                    <div className="p-4 border-2 border-gray-700 rounded-lg bg-gray-800 overflow-y-auto max-h-48 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                        <p className="text-gray-300 whitespace-pre-line">
                            {stationDetails.description}
                        </p>
                    </div>
                </div>

                {/* Streams list */}
                <div className="space-y-3">
                    {stationDetails.streams?.map(({ url }, index) => (
                        <div
                            key={`${id}-stream-${index}`}
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-left font-mono text-sm text-gray-300 truncate whitespace-break-spaces">
                                    {url}
                                </span>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}