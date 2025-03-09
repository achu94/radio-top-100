# Top 100 Radio Stations Aggregator Web App

[![Live Demo](https://img.shields.io/badge/Live_Demo-Available-green?style=for-the-badge)](https://top100.achu.best/)

A modern web application for exploring and listening to the top 100 radio stations worldwide. Built with Next.js and Tailwind CSS, featuring search, pagination, and real-time stream playback.

## Features

- **Top 100 Stations List**: Browse curated list of popular radio stations
- **Instant Search**: Find stations by name in real-time
- **Smart Pagination**: Navigate through stations with 20 items per page
- **Detailed Station View**
- **Live Stream Playback**: Integrated audio player with HLS support
- **State Management**: Global store for player state

## Technologies Used

- **Next.js** (React Framework)
- **Tailwind CSS** (Utility-first CSS)
- **hls.js** (HLS stream playback)
- **Zustand** (State management)
- **React Icons** (Icon library)
- **Jest** (Testing framework)

## Live Demo

Experience the app live at: [https://top100.achu.best/](https://top100.achu.best/)

## Getting Started

### Prerequisites

- [Node.js 18.18](https://nodejs.org) or later.

### Installation

1. Clone the repository
```bash
git clone https://github.com/achu94/radio-top-100.git
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
STATIONS_API_URL=https://prod.radio-api.net/stations/list-by-system-name?systemName=STATIONS_TOP
STATION_DETAILS_API_URL=https://prod.radio-api.net/stations/details
NEXT_PUBLIC_BASE_URL=http://localhost:3000
TOP_HUNDERT_PAGES=5
```

4. Running the App
```bash
npm run dev
```

5. Testing
```bash
npm run test
```

| Variable Name                 | Description                                   |
|-------------------------------|-----------------------------------------------|
| `STATIONS_API_URL`            | Endpoint for station list data               |
| `STATION_DETAILS_API_URL`     | Endpoint for detailed station information    |
| `NEXT_PUBLIC_BASE_URL`        | Deployment base or localhost:port URL                          |
| `TOP_HUNDERT_PAGES`           | Number of pagination pages available         |

## Acknowledgements
- **Radio data provided by** [radio.net](radio.net/)
- **HLS stream handling powered by hls.js**
- **State management with Zustand**
