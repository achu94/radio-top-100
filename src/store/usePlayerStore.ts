// src/store/usePlayerStore.ts
import { create } from "zustand";
import Hls from "hls.js";

interface PlayerState {
    isPlaying: boolean;
    isLoading: boolean; // Neuer Ladezustand
    currentStationId: string | null;
    hlsInstance: Hls | null;
    actions: {
        playStation: (stationId: string, streamUrl: string) => void;
        pauseStation: () => void;
    };
}

const usePlayerStore = create<PlayerState>((set, get) => ({
    isPlaying: false,
    isLoading: false, // Initialer Ladezustand
    currentStationId: null,
    hlsInstance: null,

    actions: {
        playStation: (stationId, streamUrl) => {
            const { hlsInstance, currentStationId, isLoading } = get();

            // Verhindere Mehrfachklicks während des Ladens
            if (isLoading) return;

            // Wenn dieselbe Station angeklickt wird, toggle play/pause
            if (currentStationId === stationId) {
                set((state) => ({ isPlaying: !state.isPlaying }));
                return;
            }

            // Stoppe vorherige Station
            if (hlsInstance) {
                hlsInstance.destroy();
            }

            // Setze den Ladezustand
            set({ isLoading: true });

            // Erstelle eine neue HLS-Instanz
            const newHls = new Hls();
            const audioElement = new Audio();

            // HLS-Stream laden
            newHls.loadSource(streamUrl);
            newHls.attachMedia(audioElement);

            // Wenn der Stream bereit ist, abspielen
            newHls.on(Hls.Events.MANIFEST_PARSED, () => {
                set({
                    isPlaying: true,
                    currentStationId: stationId,
                    hlsInstance: newHls,
                });

                audioElement.play();
            });

            newHls.on(Hls.Events.DESTROYING, () => {
                audioElement.remove();
            });

            // Fehlerbehandlung
            newHls.on(Hls.Events.ERROR, (event, data) => {
                set({
                    isPlaying: false,
                    currentStationId: null,
                    hlsInstance: null,
                    isLoading: false,
                });

                console?.error("HLS Error:", data);
            });

            // hls.js dont have event, which triggers on stream-play.
            // Im using this setTimeout to prevent pause bevore the station is playing
            setTimeout(() => {
                set({
                    isLoading: false
                });
            }, 3000);
        },

        pauseStation: () => {
            const { hlsInstance } = get();
            if (hlsInstance) {
                hlsInstance.destroy();
            }
            set({ isPlaying: false, currentStationId: null, hlsInstance: null });
        },
    },
}));

// Selektoren
export const useCurrentStation = () => usePlayerStore((state) => state.currentStationId);
export const useIsPlaying = () => usePlayerStore((state) => state.isPlaying);
export const useIsLoading = () => usePlayerStore((state) => state.isLoading); // Neuer Selektor
export const usePlayerActions = () => usePlayerStore((state) => state.actions);