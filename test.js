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

const str =
    'name: 2, url: "https://www.baidu.com" } \n name: 2, url: "https://www.baidu.com" }';
const res1 = str
    .replace("}", "")
    .split("\n")
    .filter((_) => _)
    .map((_) =>
        _.split(",").reduce((obj, str) => {
            const [, key, val] = str.match(/(\w+):([\s\d\w]+)/);
            obj[key.trim()] = val.trim();
            return obj;
        }, {})
    );
console.log("res1:", res1);
