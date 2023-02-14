// to [1, [1,2,4]2, 3, 4, 5, 5, 5, 5, 5];
// out [1, 2, 3, 4, 5];

const arr = [1, [2, 3, [4, 5]]];
const res = [1, 2, 3, 4, 5];

function _flat(list = []) {
    return list.reduce((res, cur) => {
        const _res = [...res, ...(Array.isArray(cur) ? _flat(cur) : [cur])];
        return _res;
    }, []);
}

console.log("_flat:", _flat(arr));
