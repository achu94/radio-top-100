import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { error: 'stationId is required' },
            { status: 400 }
        );
    }

    try {
        const apiUrl = `${process.env.STATION_DETAILS_API_URL}?stationIds=${id}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch station details. Status: ${response.status}`);
        }

        const stationDetails = await response.json();

        // Cache-Control-Header 1 Hour
        const cacheControl = "public, max-age=3600, stale-while-revalidate=3600";
        return NextResponse.json({ stationDetails }, {
            headers: {
                "Cache-Control": cacheControl,
            },
        });
    } catch (error) {
        console.error("Failed to fetch station src:", error);
        return NextResponse.json(
            { error: "Failed to fetch station src" },
            { status: 500 }
        );
    }
}