import { useEffect, useState } from "react";
import TrainList from "../components/TrainList";
import type { TrainData } from "../components/Train";
import NavBar from "../components/NavBar";

export default function LinesPage() {
    const [currColor, setCurrColor] = useState("gold");
    const [trains, setTrains] = useState<TrainData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [stations, setStations] = useState<{ STATION: string }[]>([]);
    const [selectedStation, setSelectedStation] = useState("");
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    useEffect(() => {
        let cancelled = false;

        fetch(`https://marta-bootcamp-api.vercel.app/arrivals/${currColor}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch trains.");
                }
                return response.json();
            })
            .then((data: TrainData[]) => {
                console.log("API response", data);
                console.log("Directions:", [...new Set(data.map((train) => train.DIRECTION))]);
                console.log("Realtime values:", [...new Set(data.map((train) => train.IS_REALTIME))])
                console.log("Request cancelled:", cancelled);
                if (!cancelled) {
                    setTrains(data);
                    setLoading(false);
                    console.log("Loading set to false")
                }
            })
            .catch((error) => {
                if (!cancelled) {
                    console.error(error);
                    setError("Could not load train data.");
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [currColor]);

    useEffect(() => {
        let cancelled = false;

        setStations([]);

        fetch(`https://marta-bootcamp-api.vercel.app/arrivals/${currColor}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch stations.");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Station API response", data);

                if (!cancelled) {
                    setStations(data);
                }
            })
            .catch((error) => {
                if (!cancelled) {
                    console.error("Error fetching stations:", error);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [currColor]);

    function changeLine(color: string) {
        setCurrColor(color);
        setTrains([]);
        setLoading(true);
        setError("");
        setSelectedStation("");
        setActiveFilters([]);
    }

    const filteredTrains = trains.filter((train) => {
        if (selectedStation !== "" && train.STATION !== selectedStation) {
            return false;
        }

        if (
            activeFilters.includes("Arriving") &&
            train.WAITING_TIME.toLowerCase() !== "arriving"
        ) {
            return false;
        }

        if (
            activeFilters.includes("Scheduled") &&
            train.IS_REALTIME !== "false"
        ) {
            return false;
        }

        const selectedDirections = activeFilters.filter((filter) => ["Northbound", "Southbound", "Eastbound", "Westbound"].includes(filter));

        if (
            selectedDirections.length > 0 &&
            !selectedDirections.some((direction) => train.DIRECTION.toUpperCase() === direction.charAt(0).toUpperCase()
        )
        ) {
            return false;
        }

        return true;
    });

    const directions = currColor === "gold" || currColor === "red" ? ["Northbound", "Southbound"] : ["Eastbound", "Westbound"];
    const filterButtons = ["Arriving", "Scheduled", ...directions];

    function toggleFilter(filter: string) {
        setActiveFilters((previous) =>
            previous.includes(filter)
                ? previous.filter((item) => item !== filter)
                : [...previous, filter]
        );
    }

    return (
        <div>
            <h1>{currColor.toUpperCase()} Line</h1>

            <div>
                <button onClick={() => changeLine("gold")}>Gold</button>
                <button onClick={() => changeLine("red")}>Red</button>
                <button onClick={() => changeLine("blue")}>Blue</button>
                <button onClick={() => changeLine("green")}>Green</button>
            </div>

            {loading ? (
                <p>Loading trains...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="train-layout">
                    <NavBar stations={stations} selectedStation={selectedStation} onSelectStation={setSelectedStation} />
                    <div className="filter-buttons">
                        {filterButtons.map((filter) => (
                            <button key={filter} onClick={() => toggleFilter(filter)} className={activeFilters.includes(filter) ? "active" : ""}>
                                {filter}
                            </button>
                        ))}
                    </div>
                    {filteredTrains.length === 0 ? (
                        <p>No current trains match your filters.</p>
                    ): (
                        <TrainList trains={filteredTrains} />
                    )}
                </div>
            )}
        </div>
    );
}