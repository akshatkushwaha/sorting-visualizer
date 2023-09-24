import { Algo, Speed, Status } from "./enums";
import { BarType, AlgoType } from "./types";

const swap = (barList: BarType[], i: number, j: number) => {
    const temp = barList[i];
    barList[i] = barList[j];
    barList[j] = temp;
};

const getAnimationSpeed = (speed: Speed) => {
    let animationSpeed: number;

    if (speed === Speed.Slow) {
        animationSpeed = 1000;
    } else if (speed === Speed.Medium) {
        animationSpeed = 700;
    } else {
        animationSpeed = 300;
    }

    return animationSpeed;
};

const bubbleSort = async (
    barList: BarType[],
    speed: Speed,
    setArray: (barList: BarType[]) => void
) => {
    let animationSpeed: number = getAnimationSpeed(speed);
    const size = barList.length;

    for (let i = 0; i < size - 1; i++) {
        for (let j = 0; j < size - i - 1; j++) {
            barList[j].status = Status.Comparing;
            barList[j + 1].status = Status.Comparing;
            setArray([...barList]);

            await new Promise((resolve) => setTimeout(resolve, animationSpeed));

            if (barList[j].height > barList[j + 1].height) {
                swap(barList, j, j + 1);
                setArray([...barList]);
            }

            barList[j].status = Status.Default;
            barList[j + 1].status = Status.Default;
            setArray([...barList]);
        }

        barList[size - i - 1].status = Status.Sorted;
        setArray([...barList]);
    }
};

const selectionSort = async (
    barList: BarType[],
    speed: Speed,
    setArray: (barList: BarType[]) => void
) => {
    let animationSpeed: number = getAnimationSpeed(speed);
    const size = barList.length;

    for (let i = 0; i < size - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < size; j++) {
            barList[j].status = Status.Comparing;
            barList[minIndex].status = Status.Comparing;
            setArray([...barList]);

            await new Promise((resolve) => setTimeout(resolve, animationSpeed));

            if (barList[j].height < barList[minIndex].height) {
                barList[minIndex].status = Status.Default;
                minIndex = j;
            } else {
                barList[j].status = Status.Default;
            }
        }

        barList[minIndex].status = Status.Sorted;
        swap(barList, minIndex, i);
        setArray([...barList]);
    }

    barList[size - 1].status = Status.Sorted;
    setArray([...barList]);
};

const insertionSort = async (
    barList: BarType[],
    speed: Speed,
    setArray: (barList: BarType[]) => void
) => {
    let animationSpeed: number = getAnimationSpeed(speed);
    const size = barList.length;

    for (let i = 0; i < size; i++) {
        for (let j = i; j > 0; j--) {
            barList[j].status = Status.Comparing;
            barList[j - 1].status = Status.Comparing;
            setArray([...barList]);

            await new Promise((resolve) => setTimeout(resolve, animationSpeed));

            if (barList[j].height < barList[j - 1].height) {
                swap(barList, j, j - 1);
                setArray([...barList]);
            } else {
                break;
            }

            barList[j].status = Status.Sorted;
            barList[j - 1].status = Status.Sorted;
            setArray([...barList]);
        }

        for (let j = i; j >= 0; j--) {
            barList[j].status = Status.Sorted;
            setArray([...barList]);
        }
        setArray([...barList]);
    }
};

const mergeSort = async (
    barList: BarType[],
    speed: Speed,
    setArray: (barList: BarType[]) => void
) => {
    let animationSpeed: number = getAnimationSpeed(speed);
    const size = barList.length;

    const merge = async (barList: BarType[], l: number, m: number, r: number) => {
        const n1 = m - l + 1;
        const n2 = r - m;

        const left = new Array(n1);
        const right = new Array(n2);

        for (let i = 0; i < n1; i++) {
            left[i] = barList[l + i];
        }

        for (let i = 0; i < n2; i++) {
            right[i] = barList[m + 1 + i];
        }

        let i = 0;
        let j = 0;
        let k = l;

        while (i < n1 && j < n2) {
            left[i].status = Status.Comparing;
            right[j].status = Status.Comparing;
            setArray([...barList]);

            await new Promise((resolve) => setTimeout(resolve, animationSpeed));

            if (left[i].height <= right[j].height) {
                barList[k] = left[i];
                i++;
            } else {
                barList[k] = right[j];
                j++;
            }

            k++;
        }

        while (i < n1) {
            barList[k] = left[i];
            i++;
            k++;
        }

        while (j < n2) {
            barList[k] = right[j];
            j++;
            k++;
        }
    };

    const mergeSortHelper = async (barList: BarType[], l: number, r: number) => {
        if (l >= r) {
            return;
        }

        const m = l + Math.floor((r - l) / 2);

        await mergeSortHelper(barList, l, m);
        await mergeSortHelper(barList, m + 1, r);
        await merge(barList, l, m, r);
    };

    await mergeSortHelper(barList, 0, size - 1);

    for (let i = 0; i < size; i++) {
        barList[i].status = Status.Sorted;
        setArray([...barList]);
    }

    setArray([...barList]);
};

const quickSort = async (
    barList: BarType[],
    speed: Speed,
    setArray: (barList: BarType[]) => void
) => {
    let animationSpeed: number = getAnimationSpeed(speed);
    const size = barList.length;

    const partition = async (barList: BarType[], low: number, high: number) => {
        const pivot = barList[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            barList[j].status = Status.Comparing;
            pivot.status = Status.Comparing;
            setArray([...barList]);

            await new Promise((resolve) => setTimeout(resolve, animationSpeed));

            if (barList[j].height < pivot.height) {
                i++;
                swap(barList, i, j);
                setArray([...barList]);
            }

            barList[j].status = Status.Default;
            pivot.status = Status.Default;
            setArray([...barList]);
        }

        swap(barList, i + 1, high);
        setArray([...barList]);

        return i + 1;
    };

    const quickSortHelper = async (barList: BarType[], low: number, high: number) => {
        if (low < high) {
            const pi = await partition(barList, low, high);

            await quickSortHelper(barList, low, pi - 1);
            await quickSortHelper(barList, pi + 1, high);
        }
    };

    await quickSortHelper(barList, 0, size - 1);

    for (let i = 0; i < size; i++) {
        barList[i].status = Status.Sorted;
        setArray([...barList]);
    }

    setArray([...barList]);
};

const heapSort = async (
    barList: BarType[],
    speed: Speed,
    setArray: (barList: BarType[]) => void
) => {
    let animationSpeed: number = getAnimationSpeed(speed);
    const size = barList.length;

    const heapify = async (barList: BarType[], size: number, i: number) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < size && barList[left].height > barList[largest].height) {
            largest = left;
        }

        if (right < size && barList[right].height > barList[largest].height) {
            largest = right;
        }

        if (largest !== i) {
            swap(barList, i, largest);
            setArray([...barList]);

            await heapify(barList, size, largest);
        }
    };

    const heapSortHelper = async (barList: BarType[], size: number) => {
        for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
            await heapify(barList, size, i);
        }

        for (let i = size - 1; i > 0; i--) {
            swap(barList, 0, i);
            setArray([...barList]);

            await heapify(barList, i, 0);
        }
    };

    await heapSortHelper(barList, size);

    for (let i = 0; i < size; i++) {
        barList[i].status = Status.Sorted;
        setArray([...barList]);
    }

    setArray([...barList]);
};

const algorithms: AlgoType = {
    [Algo.BubbleSort]: bubbleSort,
    [Algo.SelectionSort]: selectionSort,
    [Algo.InsertionSort]: insertionSort,
    [Algo.MergeSort]: mergeSort,
    [Algo.QuickSort]: quickSort,
    [Algo.HeapSort]: heapSort,
};

export default algorithms;
