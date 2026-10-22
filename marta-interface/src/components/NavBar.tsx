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
        <div className="station-sidebar">
            <h2>Stations</h2>

            <button
            className={selectedStation === "" ? "selected" : ""}
            onClick={() => onSelectStation("")}>
                All Stations
            </button>

            {uniqueStations.map((station) => (
                    <button
                        key={station}
                    onClick={() => onSelectStation(station)}
                    className={selectedStation === station ? "selected" : ""}>
                        {station}
                    </button>
            ))}
        </div>
    )
}