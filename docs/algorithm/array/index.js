// var runningSum = function(nums) {
//     const arr = [];
//     for(let i = 0; i < nums.length; i++){
//         const val = i === 0 ? nums[i] : arr[i-1] + nums[i];
//         arr.push(val)
//     }
//     return arr;
// };

// var kidsWithCandies = function(candies, extraCandies) {
//     // 思路
//     // 计算数组内的最大值
//     // 遍历时，比较当前值与最大值的差，如果能补足，则返回trur
//     const max = Math.max(...candies)
//     const arr = []
//     for(let i = 0; i < candies.length; i++){
//         const dis = max - candies[i];
//         arr.push(extraCandies >= dis);
//     }
//     return arr;
// };

// var shuffle = function(nums, n) {
//     // 思路
//     // i 和 i+n 同步加入数组
//     const arr = [];
//     for(let i = 0; i < n; i++){
//         arr.push(nums[i], nums[i+n])
//     }
//     return arr;
// };

var arrayStringsAreEqual = function(word1, word2) {
    return word1.join('') === word2.join('')
};

const res = arrayStringsAreEqual(['ab'], ['a', 'b']);
console.log('res:', res);