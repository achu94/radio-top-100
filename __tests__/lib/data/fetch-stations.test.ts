import { getTopHundert } from '@/lib/data/fetch-stations';

import { jest } from '@jest/globals';
import mockData from '@/mocks/stationResponse.json';

// Mock Umgebungsvariablen
jest.mock('process', () => ({
    env: {
        STATIONS_API_URL: 'https://mock-api.url'
    }
}));

describe('getTopHundert', () => {
    beforeEach(() => {
        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return valid RadioStation objects', async () => {
        const result = await getTopHundert();

        result.forEach((station, index) => {
            // Kontext für bessere Fehlermeldungen
            const errorContext = `Station at index ${index}:`;

            // Einzelne Überprüfungen mit klaren Fehlermeldungen
            expect(typeof station.id).toBe('string');
            expect(typeof station.name).toBe('string');
            expect(Array.isArray(station.streams)).toBe(true);
            expect(typeof station.country).toBe('string');
            expect(typeof station.logo300x300).toBe('string');

            // Zusätzliche Überprüfung der Streams (falls benötigt)
            station.streams.forEach((stream, streamIndex) => {
                const streamErrorContext = `${errorContext} Stream ${streamIndex}:`;
                expect(typeof stream.url).toBe('string');
                expect(typeof stream.status).toBe('string');
                expect(typeof stream.contentFormat).toBe('string');
            });
        });

        // Beispielüberprüfung für ein spezifisches Feld
        expect(result[0].streams).toBeInstanceOf(Array);
    });

    it('should filter by station name', async () => {
        const query = 'news';
        const result = await getTopHundert(query);

        expect(result.every(station =>
            station.name.toLowerCase().includes(query.toLowerCase())
        )).toBe(true);
    });

    it('should handle pagination correctly', async () => {
        const pageSize = 20;
        const page2 = await getTopHundert(undefined, 2);

        expect(page2).toHaveLength(pageSize);
        expect(page2[0].id).toBe(mockData.playables[pageSize].id);
    });

    it('should handle empty streams array', async () => {
        // Mock spezielle Testdaten
        const mockStationWithoutStreams = {
            ...mockData.playables[0],
            streams: [],
            hasValidStreams: false
        };

        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ playables: [mockStationWithoutStreams] }),
            })
        );

        const result = await getTopHundert();
        expect(result[0].hasValidStreams).toBe(false);
        expect(result[0].streams).toHaveLength(0);
    });
});
