export type Stream = {
    url: string;
    contentFormat: string;
    status: "VALID" | "INVALID";
};

export type BlockingInformation = {
    isBlocked: boolean;
    isBlockedIn: string[];
};

export type RadioStation = {
    city: string;
    country: string;
    genres: string[];
    id: string;
    lastModified: number;
    logo44x44: string;
    logo100x100: string;
    logo175x175: string;
    logo300x300: string;
    logo630x630: string;
    logo1200x1200: string;
    logo2160x2160: string;
    strikingColor1: string;
    strikingColor2: string;
    name: string;
    topics: string[];
    streams: Stream[];
    hasValidStreams: boolean;
    adParams: string;
    type: "STATION";
    seoRelevantIn: string[];
    relevantIn: string[];
    blockingInformation: BlockingInformation;
};

export type StationsResponse = {
    systemName: string;
    title: string;
    playables: RadioStation[];
    displayType: string;
    count: number;
    offset: number;
    totalCount: number;
};

export type RadioStationDetails = {
    stationDetails: {
        id: string;
        name: string;
        lastModified: number;
        logo44x44: string;
        logo100x100: string;
        logo175x175: string;
        logo300x300: string;
        logo630x630: string;
        logo1200x1200: string;
        logo2160x2160: string;
        strikingColor1: string;
        strikingColor2: string;
        hasValidStreams: boolean;
        streams: {
            url: string;
            contentFormat: string;
            status: string;
        }[];
        city: string;
        country: string;
        topics: string[];
        genres: string[];
        type: string;
        description: string;
        homepageUrl: string;
        adParams: string;
        hideReferer: boolean;
        continent: string;
        languages: string[];
        region: string;
        topicTags: {
            systemName: string;
            name: string;
            slug: string;
            count: number;
        }[];
        genreTags: {
            systemName: string;
            name: string;
            slug: string;
            count: number;
        }[];
        cityTag: {
            systemName: string;
            name: string;
            slug: string;
            count: number;
        };
        parentTag: {
            systemName: string;
            name: string;
            slug: string;
            count: number;
        };
        familyTag: {
            systemName: string;
            name: string;
        };
        languageTags: {
            systemName: string;
            name: string;
            slug: string;
            count: number;
        }[];
        regionTag: {
            systemName: string;
            name: string;
            slug: string;
            count: number;
        };
        countryTag: {
            systemName: string;
            name: string;
            slug: string;
            count: number;
        };
        rank: number;
        shortDescription: string;
        enabled: boolean;
        seoRelevantIn: string[];
        relevantIn: string[];
        aliases: string[];
        blockingInformation: {
            isBlocked: boolean;
            isBlockedIn: string[];
        };
    }[];
}

export type StationButtonProps = Pick<
    RadioStation,
    "id" | "name" | "logo44x44" | "genres"
>;