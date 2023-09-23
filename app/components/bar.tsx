import { Status } from "../algo/enums";
import { BarType } from "../algo/types";

export default function Bar(props: { object: BarType }) {
    const { height, status } = props.object;

    return (
        <div
            className={`h-${height} w-4 m-1 rounded-sm ${
                status === Status.Comparing ? "bg-red-500" : ""
            }
                ${status === Status.Sorted ? "bg-green-500" : ""}
                ${status === Status.Default ? "bg-blue-500" : ""}`}
            style={{
                height: `${8 * height}px`,
            }}
        ></div>
    );
}
