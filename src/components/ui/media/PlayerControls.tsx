// components/PlayerControls.tsx
'use client';

import Image from 'next/image';
import { useCurrentStation, useIsPlaying, useIsLoading, usePlayerActions } from '@/store/usePlayerStore';

interface IPlayerControls {
    imageUrl: string;
    imageSize?: number;
    streamUrl: string;
    stationId: string;
    altText?: string;
}

export const PlayerControls = ({
    imageUrl,
    imageSize = 200,
    streamUrl,
    stationId,
    altText = 'Station Image',
}: IPlayerControls) => {
    const currentStationId = useCurrentStation();
    const isPlaying = useIsPlaying();
    const isLoading = useIsLoading();
    const { playStation, pauseStation } = usePlayerActions();

    const isCurrentPlaying = currentStationId === stationId && isPlaying;

    const handleClick = () => {
        if (isLoading) return; // Verhindere Mehrfachklicks während des Ladens

        if (isCurrentPlaying) {
            pauseStation();
        } else {
            playStation(stationId, streamUrl);
        }
    };

    return (
        <div
            className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ width: imageSize, height: imageSize }}
        >
            <Image
                src={imageUrl}
                alt={altText}
                width={imageSize}
                height={imageSize}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:opacity-100 transition-opacity" />

            <button
                onClick={handleClick}
                disabled={isLoading}
                className="absolute inset-0 flex items-center justify-center w-full h-full opacity-70 bg-black/30 group-hover:opacity-100 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    // Lade-Spinner
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : isCurrentPlaying ? (
                    // Pause-Icon
                    <Image
                        src="/icons/pause.svg"
                        alt="Pause"
                        width={48}
                        height={48}
                        className="w-36 h-36"
                    />
                ) : (
                    // Play-Icon
                    <Image
                        src="/icons/play.svg"
                        alt="Play"
                        width={48}
                        height={48}
                        className="w-36 h-36"
                    />
                )}
            </button>

            {isCurrentPlaying && !isLoading && (
                <div className="absolute bottom-4 left-4 flex space-x-1">
                    <div className="w-1.5 h-6 bg-white animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-1.5 h-8 bg-white animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-1.5 h-6 bg-white animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-4 bg-white animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
            )}
        </div>
    );
};