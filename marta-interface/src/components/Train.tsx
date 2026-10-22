export type TrainData = {
    STATION: string;
    DESTINATION: string;
    LINE: string;
    WAITING_TIME: string;
    DELAY: string;
    DIRECTION: string;
    IS_REALTIME: string;
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
        <div className="train-card">
            <div className="train-card-main">
                <div className="train-logo">M</div>

                <div className="train-details">
                    <h3>{STATION} → {DESTINATION}</h3>
                    <p>Destination: {DESTINATION}</p>
                    <span className={`line-badge ${LINE.toLowerCase()}`}>
                        {LINE}
                    </span>
                </div>
            </div>

            <div className="train-card-status">
                <span className={isOnTime ? "on-time" : "delayed"}>
                    {isOnTime ? "On Time" : "Delayed"}
                </span>
                <strong>{WAITING_TIME}</strong>
            </div>
        </div>
    );
}