import Train from "./Train";
import type { TrainData } from "./Train";

type TrainListProps = {
    trains: TrainData[];
};

export default function TrainList({ trains } : TrainListProps) {
    return (
        <div>
            {trains.map((train, index) => (
                <Train
                    key={index} {...train}
                />
            ))}
        </div>
    );
}