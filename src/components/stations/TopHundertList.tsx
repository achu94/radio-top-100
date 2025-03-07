import { RadioStation } from "@/lib/types/stations";
import { getTopHundert } from "@/lib/data/fetch-stations";
import StationListItem from "../ui/station/StationListItem";
import { Suspense } from "react";

import Search from "../ui/Search";
import Pagination from "../ui/Pagination";

// invalidate every hour
export const revalidate = 3600;

export default async function TopHundertList({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {

    const topHundertStations: RadioStation[] = await getTopHundert(query, currentPage);
    const totalPages = process.env.TOP_HUNDERT_PAGES ? Number(process.env.TOP_HUNDERT_PAGES) : 5;

    return (
        <div className="bg-gray-900 min-h-screen p-4">
            <p className="mx-auto text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">Top100 Stations</p>

            <div className="mb-4 max-w-80 m-auto">
                <Search placeholder="Search stations..." />
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-6 justify-center">
                <Suspense key={query + currentPage}>
                    {
                        topHundertStations.map((station: RadioStation) => (
                            <StationListItem
                                logo44x44={station.logo44x44}
                                name={station.name}
                                genres={station.genres}
                                id={station.id}
                                key={station.id}
                            />
                        ))
                    }
                </Suspense>
            </div>
            <Pagination totalPages={totalPages} />
        </div>
    )
}