import { useEffect, useState } from "react";
import TrainList from "../components/TrainList";
import type { TrainData } from "../components/Train";

export default function LinesPage() {
    const [currColor, setCurrColor] = useState("gold");
    const [trains, setTrains] = useState<TrainData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    function changeLine(color: string) {
        setCurrColor(color);
        setTrains([]);
        setLoading(true);
        setError("");
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
                <TrainList trains={trains} />
            )}
        </div>
    );
}