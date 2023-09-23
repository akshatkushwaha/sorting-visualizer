import { Speed, Status } from "./enums";
import { BarType } from "./types";

const swap = (barList: BarType[], i: number, j: number) => {
    const temp = barList[i].height;
    barList[i].height = barList[j].height;
    barList[j].height = temp;
};

const bubbleSort = async (
    barList: BarType[],
    speed: Speed,
    setArray: (barList: BarType[]) => void
) => {
    let animationSpeed: number;

    if (speed === Speed.Slow) {
        animationSpeed = 1000;
    } else if (speed === Speed.Medium) {
        animationSpeed = 700;
    } else {
        animationSpeed = 300;
    }

    const newArray = [...barList];
    let isSorted = false;
    let counter = 0;

    while (!isSorted) {
        isSorted = true;

        for (let i = 0; i < newArray.length - 1 - counter; i++) {
            newArray[i].status = Status.Comparing;
            newArray[i + 1].status = Status.Comparing;
            setArray([...newArray]);
            await new Promise((resolve) => setTimeout(resolve, animationSpeed));

            if (newArray[i].height > newArray[i + 1].height) {
                swap(newArray, i, i + 1);
                isSorted = false;
            }

            newArray[i].status = Status.Default;
            newArray[i + 1].status = Status.Default;
            setArray([...newArray]);
            await new Promise((resolve) => setTimeout(resolve, animationSpeed));
        }

        newArray[newArray.length - 1 - counter].status = Status.Sorted;
        setArray([...newArray]);
        counter++;

        await new Promise((resolve) => setTimeout(resolve, animationSpeed));

        if (isSorted) {
            for (let i = 0; i < newArray.length; i++) {
                newArray[i].status = Status.Sorted;
                setArray([...newArray]);
                await new Promise((resolve) => setTimeout(resolve, animationSpeed));
            }
        }
    }
};

const selectionSort = async (
    barList: BarType[],
    speed: Speed,
    setArray: (barList: BarType[]) => void
) => {
    let animationSpeed: number;

    if (speed === Speed.Slow) {
        animationSpeed = 1000;
    } else if (speed === Speed.Medium) {
        animationSpeed = 700;
    } else {
        animationSpeed = 300;
    }

    const newArray = [...barList];

    for (let i = 0; i < newArray.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < newArray.length; j++) {
            newArray[j].status = Status.Comparing;
            newArray[minIndex].status = Status.Comparing;
            setArray([...newArray]);
            await new Promise((resolve) => setTimeout(resolve, animationSpeed));

            if (newArray[j].height < newArray[minIndex].height) {
                minIndex = j;
            }

            newArray[j].status = Status.Default;
            newArray[minIndex].status = Status.Default;
            setArray([...newArray]);
            await new Promise((resolve) => setTimeout(resolve, animationSpeed));
        }

        swap(newArray, i, minIndex);
        newArray[i].status = Status.Sorted;
        setArray([...newArray]);
        await new Promise((resolve) => setTimeout(resolve, animationSpeed));

        if (i === newArray.length - 1) {
            for (let i = 0; i < newArray.length; i++) {
                newArray[i].status = Status.Sorted;
                setArray([...newArray]);
                await new Promise((resolve) => setTimeout(resolve, animationSpeed));
            }
        }
    }
};

const insertionSort = async (
    barList: BarType[],
    speed: Speed,
    setArray: (barList: BarType[]) => void
) => {
    let animationSpeed: number;

    if (speed === Speed.Slow) {
        animationSpeed = 1000;
    } else if (speed === Speed.Medium) {
        animationSpeed = 700;
    } else {
        animationSpeed = 300;
    }

    const newArray = [...barList];

    for (let i = 1; i < newArray.length; i++) {
        let j = i;
        while (j > 0 && newArray[j].height < newArray[j - 1].height) {
            newArray[j].status = Status.Comparing;
            newArray[j - 1].status = Status.Comparing;
            setArray([...newArray]);
            await new Promise((resolve) => setTimeout(resolve, animationSpeed));

            swap(newArray, j, j - 1);
            newArray[j].status = Status.Default;
            newArray[j - 1].status = Status.Default;
            setArray([...newArray]);
            await new Promise((resolve) => setTimeout(resolve, animationSpeed));

            j--;
        }

        newArray[j - 1].status = Status.Sorted;
        setArray([...newArray]);
        await new Promise((resolve) => setTimeout(resolve, animationSpeed));

        if (i === newArray.length - 1) {
            for (let i = 0; i < newArray.length; i++) {
                newArray[i].status = Status.Sorted;
                setArray([...newArray]);
                await new Promise((resolve) => setTimeout(resolve, animationSpeed));
            }
        }
    }
};

const mergeSort = async (
    barList: BarType[],
    speed: Speed,
    setArray: (barList: BarType[]) => void
) => {};

const quickSort = async (
    barList: BarType[],
    speed: Speed,
    setArray: (barList: BarType[]) => void
) => {};

const heapSort = async (
    barList: BarType[],
    speed: Speed,
    setArray: (barList: BarType[]) => void
) => {};

export { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort };
