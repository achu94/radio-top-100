// components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
    useCurrentStationId,
    useIsPlaying,
    useIsLoading,
    usePlayerActions
} from '@/store/usePlayerStore';

export default function Header() {
    const currentStationId = useCurrentStationId();
    const isPlaying = useIsPlaying();
    const isLoading = useIsLoading();
    const { pauseStation } = usePlayerActions();

    return (
        <header className="w-full bg-gray-800/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
            <div className=" p-2 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <Image
                        src="/icons/logo.svg"
                        alt="Radio Stream"
                        width={40}
                        height={40}
                        className="shrink-0"
                    />
                </Link>

                {/* Player Controls */}
                {currentStationId && (
                    <div className="flex items-center gap-4">

                        {isLoading ? (
                            <span className="animate-pulse bg-primary rounded-2xl p-2">Loading...</span>
                        ) : isPlaying && (
                            <div className='flex items-center gap-4'>

                                <div className="left-4 flex space-x-1">
                                    <div className="w-1.5 h-4 bg-white animate-bounce" style={{ animationDelay: '0s' }} />
                                    <div className="w-1.5 h-6 bg-white animate-bounce" style={{ animationDelay: '0.1s' }} />
                                    <div className="w-1.5 h-4 bg-white animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    <div className="w-1.5 h-2 bg-white animate-bounce" style={{ animationDelay: '0.3s' }} />
                                </div>

                                <button
                                    onClick={pauseStation}
                                    className=" flex items-center gap-5 px-3 py-1.5 bg-primary hover:bg-purple-500 rounded-full text-sm font-medium text-white transition-colors"
                                >
                                    Stop
                                </button>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </header>
    );
};