import React, { useState, useEffect } from "react";
import { Divider, Select, Option } from "@mui/joy";
import { Algo, Speed } from "../algo/enums";

export default function SidePanel(props: {
    start: (algorithm: Algo, speed: Speed, size: number) => void;
    stop: () => void;
    randomize: (size: number) => void;
}) {
    const algos = Object.values(Algo);
    const speeds = Object.values(Speed).filter((speed) => typeof speed === "string");
    const sizes = [10, 20, 30, 40, 50];

    const [algorithm, setAlgorithm] = useState<Algo>(Algo.BubbleSort);
    const [speed, setSpeed] = useState<Speed>(Speed.Fast);
    const [size, setSize] = useState<number>(50);

    useEffect(() => {
        reset();
    }, []);

    const reset = () => {
        props.stop();
        setAlgorithm(Algo.BubbleSort);
        setSpeed(Speed.Fast);
        setSize(30);
        props.randomize(30);
    };

    return (
        <div className="h-screen w-1/3 flex flex-row justify-between items-center">
            <main className="w-full h-full flex flex-col items-center justify-center">
                <Divider className="my-6" />
                <div className="flex flex-row items-center justify-center">
                    <label htmlFor="algo" className="mr-4">
                        Algorithm
                    </label>
                    <Select
                        id="algo"
                        defaultValue={algos[0]}
                        onChange={(event: React.SyntheticEvent | null, newValue: string | null) => {
                            if (newValue) {
                                setAlgorithm(newValue as Algo);
                            }
                        }}
                    >
                        {algos.map((algo, index) => (
                            <Option key={index} value={algo}>
                                {algo}
                            </Option>
                        ))}
                    </Select>
                </div>
                <Divider className="my-6" />
                <div className="flex flex-row justify-around w-full">
                    <div className="flex flex-row items-center justify-center">
                        <label htmlFor="speed" className="mr-4">
                            Speed
                        </label>
                        <Select
                            id="speed"
                            onChange={(
                                event: React.SyntheticEvent | null,
                                newValue: Speed | null
                            ) => {
                                if (newValue) {
                                    setSpeed(newValue as Speed);
                                }
                            }}
                        >
                            {speeds.map((speed, index) => (
                                <Option key={index} value={speed}>
                                    {speed}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex flex-row items-center justify-center">
                        <label htmlFor="size" className="mr-4">
                            Size
                        </label>
                        <Select
                            id="size"
                            defaultValue={sizes[2]}
                            onChange={(
                                event: React.SyntheticEvent | null,
                                newValue: number | null
                            ) => {
                                if (newValue) {
                                    setSize(newValue);
                                    props.randomize(newValue);
                                }
                            }}
                        >
                            {sizes.map((size, index) => (
                                <Option key={index} value={size}>
                                    {size}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <Divider className="my-6" />
                <div className="flex flex-row justify-around w-1/2">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            props.start(algorithm, speed, size);
                        }}
                    >
                        Start
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={props.stop}
                    >
                        Stop
                    </button>
                </div>
                <Divider className="my-6" />
                <div className="flex flex-row justify-around w-1/2">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            e.preventDefault();
                            props.randomize(size);
                        }}
                    >
                        Randomize
                    </button>
                    <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                        onClick={reset}
                    >
                        Reset
                    </button>
                </div>
                <Divider className="my-6" />
            </main>
            <Divider orientation="vertical" />
        </div>
    );
}
