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
    return (
        <div className="min-h-screen mx-auto p-4 bg-gray-900">
            {/* Logo with hover effect */}
            <div className="w-48 h-48 mx-auto mb-8 overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-105">
                <PlayerControls stationId={id} imageUrl={station.logo300x300} imageSize={200} streamUrl={station.streams[0].url} />
            </div>

            {/* Station Info */}
            <div className="space-y-6 text-center">
                {/* Name with gradient text */}
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {station.name}
                </h1>

                {/* Genres as badges */}
                <div className="flex flex-wrap justify-center gap-2">
                    {station.genres?.map((genre, index) => (
                        <span
                            key={`${id}-genre-${index}`}
                            className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                            {genre}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <p className="text-gray-400 text-lg text-left leading-relaxed max-w-prose mx-auto">
                    {station.description}
                </p>

                {/* Streams list */}
                <div className="space-y-3">
                    {station.streams?.map(({ url }, index) => (
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