// 数学表达：mx + ny = z，求整数解

// 数学思路：根据贝祖公式，设c为x和y的最大公约数，则一定存在等式c = mx+ny，m和n为整数，并且mn < 0

// 因此，z只要是最大公约数的倍数即可。


function canMeasureWater(x, y, z) {
    if (x + y < z) return false;
    if (x == 0 || y == 0) return z == 0 || x + y == z;

    let remain = x % y;
    while (remain !== 0) {
        x = y;
        y = remain;
        remain = x % y;
    }

    return z % y === 0;
}

const res = canMeasureWater(9, 8, 4);
console.log("res:", res);
