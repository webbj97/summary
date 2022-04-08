/**
 * @param {string[]} ops
 * @return {number}
 */
const ops = ["5", "-2", "4", "C", "D", "9", "+", "+"];
var calPoints = function(ops) {
    let sum = 0;
    let index = 0;
    const res = [];
    while (index < ops.length) {
        switch (ops[index]) {
            case "+":
                res.push(+res[res.length - 1] + +res[res.length - 2]);
                break;
            case "D":
                res.push(res[res.length - 1] * 2);
                break;
            case "C":
                res.splice(res.length - 1, 1);
                break;
            default:
                res.push(+ops[index]);
        }
        sum += res[res.length - 1];
        index++;
    }
    return sum;
};
console.log("calPoints(ops);:", calPoints(ops));
