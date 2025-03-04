import { RadioStation } from "@/lib/types/stations";
import { getTopHundert } from "@/lib/data/fetch-stations";
import StationListItem from "../ui/station/StationListItem";

// invalidate every hour
export const revalidate = 3600;

export default async function TopHundertList() {

    const topHundertStations: RadioStation[] = await getTopHundert();

    if (topHundertStations.length === 0) {
        return (
            <div className="text-center text-gray-500 p-4">
                No radio stations available.
            </div>
        )
    }


    return (
        <div className="flex flex-col justify-center">
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
        </div>
    )

}