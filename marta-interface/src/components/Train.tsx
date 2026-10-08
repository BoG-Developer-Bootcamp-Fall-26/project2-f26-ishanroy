export type TrainData = {
    STATION: string;
    DESTINATION: string;
    LINE: string;
    WAITING_TIME: string;
    DELAY: string;
};

export default function Train({
    STATION,
    DESTINATION,
    LINE,
    WAITING_TIME,
    DELAY,
}: TrainData) {
    const isOnTime = DELAY === "TOS";

    return (
        <div>
            <h3>{STATION} → {DESTINATION}</h3>
            <p>Line: {LINE}</p>
            <p>Arrival: {WAITING_TIME}</p>
            <p>{isOnTime ? "On Time" : "Delayed"}</p>
            <hr />
        </div>
    );
}