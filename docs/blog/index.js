// // 数学表达：mx + ny = z，求整数解

// // 数学思路：根据贝祖公式，设c为x和y的最大公约数，则一定存在等式c = mx+ny，m和n为整数，并且mn < 0

// // 因此，z只要是最大公约数的倍数即可。

// function canMeasureWater(x, y, z) {
//     if (x + y < z) return false;
//     if (x == 0 || y == 0) return z == 0 || x + y == z;

//     let remain = x % y;
//     while (remain !== 0) {
//         x = y;
//         y = remain;
//         remain = x % y;
//     }

//     return z % y === 0;
// }

// const res = canMeasureWater(9, 8, 4);
// console.log("res:", res);

// function longestPalindrome(str) {
//     let res = "";
//     for (let i = 0; i < str.length; i++) {
//         for (let j = i + 1; j <= str.length; j++) {
//             let subStr = str.substring(i, j);
//             if (
//                 subStr.split("").join("") ===
//                     subStr
//                         .split("")
//                         .reverse()
//                         .join("") &&
//                 subStr.length >= res.length
//             ) {
//                 res = subStr;
//             }
//         }
//     }
//     return res;
// }

function longestPalindrome(str) {
    const { length } = str;

    const dp = new Array(length)
        .fill([])
        .map(() => new Array(length).fill(false));

    let res = str[0];
    for (let i = 0; i < length; i++) {
        dp[i][i] = true; // 自己本身一定是回文的
    }

    if (length === 1) {
        return str;
    }

    for (let i = 1; i < length; i++) {
        for (let j = 0; j < i; j++) {
            // 边界不等，证明这一段不是回文
            if (str[i] !== str[j]) {
                dp[j][i] = false;
            } else {
                if (i - j < 3) {
                    // 边界间隔小于3时，则一定为回文
                    dp[j][i] = true;
                } else {
                    // 边界间隔大于3时，则要判断内部是否是回文
                    dp[j][i] = dp[j + 1][i - 1];
                }
            }

            if (dp[j][i] && i - j + 1 > res.length) {
                res = str.substring(j, i + 1);
                console.log('res:', res);
            }
        }
    }
    return res;
}

// 考虑一个词叫董涛

console.log("longestPalindrome:", longestPalindrome("aacabdkacaa"));

