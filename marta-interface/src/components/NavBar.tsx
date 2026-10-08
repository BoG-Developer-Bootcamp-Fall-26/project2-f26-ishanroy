type Station = {
    STATION: string;
}

type NavBarProps = {
    stations: Station[];
    selectedStation: string;
    onSelectStation: (station: string) => void;
};

export default function NavBar({ stations, selectedStation, onSelectStation }: NavBarProps) {
    const uniqueStations = [
        ...new Set(stations.map((station => station.STATION)))
    ]
    return (
        <div>
            <h2>Stations</h2>

            <button onClick={() => onSelectStation("")}>
                All Stations
            </button>

            {uniqueStations.map((station) => (
                <div key={station}>
                    <button onClick={() => onSelectStation(station)} style={{
                        backgroundColor: selectedStation === station ? "lightgreen" : "",
                    }}>{station}</button>
                </div>
            ))}
        </div>
    )
}