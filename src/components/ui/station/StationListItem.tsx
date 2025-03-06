'use client'

import Link from "next/link"
import Image from "next/image"

import { StationButtonProps } from "@/lib/types/stations"

export default function StationListItem({ genres, name, logo44x44, id }: StationButtonProps) {
    return (
        <Link
            className="flex flex-row justify-between md:basis-md p-2 border-2 border-gray-700 rounded-lg bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            href={`/station/${id}`}
        >
            <div className="flex flex-row justify-around gap-2 items-center">
                <Image
                    src={logo44x44}
                    alt={`Station 
                    ${name}`}
                    width={44}
                    height={44}
                    className="w-12 h-12 rounded-lg border-2 border-gray-600 "
                />
                <div>
                    <p>{name}</p>
                    {genres
                        ? genres.map((genre, index) => <p className="text-gray-400 inline" key={id + index + genre}>{genre} </p>)
                        : <p className="text-gray-400 inline">Missing</p>
                    }
                </div>
            </div>
        </Link>
    );
}