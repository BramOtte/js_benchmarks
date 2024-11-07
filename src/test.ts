const ratio = 10;
const iterations = 1000;

function teste(x: number) {
    if (x % ratio === 0) {
        throw "sad";
    } else {
        return x / 3;
    }
}

function testee(x: number) {
    if (x % ratio === 0) {
        throw new Error("sad");
    } else {
        return x / 3;
    }
}


function testa(x: number): [string, undefined] | [undefined, number] {
    if (x % ratio === 0) {
        return ["sad", undefined];
    } else {
        return [undefined, x / 3];
    }
}


function testt(x: number): string | number {
    if (x % ratio === 0) {
        return "sad";
    } else {
        return x / 3;
    }
}

function testo(x: number): {error: string, value?: undefined} | {error?: undefined, value: number} {
    if (x % ratio === 0) {
        return {error: "sad"};
    } else {
        return {value: x / 3};
    }
}

function testo2(x: number) {
    if (x % ratio === 0) {
        return {error: "sad", value: undefined};
    } else {
        return {error: undefined, value: x / 3};
    }
} 

function controll(x: number): number {
    return x / 3;
}

function test() {
    console.log(iterations, "iterations");
    console.log(`1 in ${ratio} errors`);

    const table: {test: string, time: number, error_cnt: number, sum: number}[] = [];

    {
        const start = performance.now();
        let error_cnt = 0;
        let sum = 0;
        for (let i = 0; i < iterations; i += 1) {
            sum += controll(i);
        }
        const end = performance.now();
        table.push({test: "no errors", time: end-start, error_cnt, sum});
        // console.log("no errors", end-start, sum, error_cnt);
    }

    {
        const start = performance.now();
        let error_cnt = 0;
        let sum = 0;
        for (let i = 0; i < iterations; i += 1) {
            const [error, value] = testa(i);
            if (error === undefined) {
                sum += value;
            } else {
                error_cnt += 1;
            }
        }
        const end = performance.now();
        table.push({test: "array", time: end-start, error_cnt, sum});
    }

    {
        const start = performance.now();
        let error_cnt = 0;
        let sum = 0;
        for (let i = 0; i < iterations; i += 1) {
            const {error, value} = testo(i);
            if (error === undefined) {
                sum += value;
            } else {
                error_cnt += 1;
            }
        }
        const end = performance.now();
        table.push({test: "object implicit", time: end-start, error_cnt, sum});
    }

    {
        const start = performance.now();
        let error_cnt = 0;
        let sum = 0;
        for (let i = 0; i < iterations; i += 1) {
            const {error, value} = testo2(i);
            if (error === undefined) {
                sum += value;
            } else {
                error_cnt += 1;
            }
        }
        const end = performance.now();
        table.push({test: "object explicit", time: end-start, error_cnt, sum});
    }

    {
        const start = performance.now();
        let error_cnt = 0;
        let sum = 0;
        for (let i = 0; i < iterations; i += 1) {
            try {
                sum += teste(i);
            } catch (e) {
                error_cnt += 1;
            }
        }
        const end = performance.now();
        table.push({test: "throw string", time: end-start, error_cnt, sum});
    }

    {
        const start = performance.now();
        let error_cnt = 0;
        let sum = 0;
        for (let i = 0; i < iterations; i += 1) {
            try {
                sum += testee(i);
            } catch (e) {
                error_cnt += 1;
            }
        }
        const end = performance.now();
        table.push({test: "throw new Error", time: end-start, error_cnt, sum});
    }

    {
        const start = performance.now();
        let error_cnt = 0;
        let sum = 0;
        for (let i = 0; i < iterations; i += 1) {
            const value = testt(i);
            if (typeof value === "number") {
                sum += value;
            } else {
                error_cnt += 1;
            }
        }
        const end = performance.now();
        table.push({test: "one value", time: end-start, error_cnt, sum});
    }

    console.table(table);
}


for (let i = 0; i < 10; i += 1) {
    test();
}
