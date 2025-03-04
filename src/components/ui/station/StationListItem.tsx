'use client'

import Link from "next/link"
import Image from "next/image"

import { StationButtonProps } from "@/lib/types/stations"

export default function StationListItem({ genres, name, logo44x44, id }: StationButtonProps) {
    return (
        <div className="flex flex-row justify-between p-2">
            <Link
                href={`/station/${id}`}
            >
                <div className="flex flex-row justify-between gap-1">
                    <Image src={logo44x44} alt={`Station ${name}`} width={44} height={44} />
                    <div>
                        <p>{name}</p>
                        {genres?.map((genre, index) => <p className="text-gray-400 inline" key={id + index + genre}>{genre} </p>)}
                    </div>
                </div>

            </Link>
            <div className="flex flex-row gap-4">
                <button>PLAY</button>
            </div>
        </div>
    );
}