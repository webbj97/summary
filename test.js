const _join = (array, separator = ",") => {
    return array.reduce((prev, next) => {
        return prev ? prev + separator + next : prev + next;
    }, "");
};

const res = _join([1, 2, 3, 4, 5], "*");
console.log("res:", res);
