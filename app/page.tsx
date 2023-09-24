"use client";

import { useState } from "react";
import Bar from "./components/bar";
import Navbar from "./components/navbar";
import SidePanel from "./components/sidepanel";
import { Algo, Speed, Status } from "./algo/enums";
import { BarType } from "./algo/types";
import algorithms from "./algo/alogs";

export default function Home() {
    const [array, setArray] = useState<BarType[]>([]);

    const start = (algorithm: Algo, speed: Speed) => {
        algorithms[algorithm](array, speed, setArray);
    };

    const randomize = (size: number) => {
        const array: BarType[] = [];
        for (let i = 0; i < size; i++) {
            array.push({
                height: Math.floor(Math.random() * 95) + 5,
                status: Status.Default,
            });
        }
        setArray(array);
    };

    const stop = () => {
        // TODO: stop the algorithm
        window.location.reload();
    };

    return (
        <div className="w-screen min-h-screen flex flex-row">
            <SidePanel start={start} stop={stop} randomize={randomize} />
            <div className="w-full">
                <Navbar />
                <main className="container h-[850px] mx-auto p-4 flex flex-row items-end justify-center">
                    {array.map((bar, index) => (
                        <Bar key={index} object={bar} />
                    ))}
                </main>
            </div>
        </div>
    );
}
