const { TestScheduler } = require("jest");

var obj = {
    202202211705: {
        total: 1,
        avg: 2,
        max: 1,
        success: 0,
        failed: 0,
    },
    202202220505: {
        total: 0,
        avg: 10,
        max: 11,
        success: 0,
        failed: 0,
    },
    202202221705: {
        total: 0,
        avg: 0.0,
        max: 12,
        success: 0,
        failed: 0,
    },
    202202230505: {
        total: 0,
        avg: 23,
        max: 23,
        success: 0,
        failed: 0,
    },
    202202231705: {
        total: 0,
        avg: 0.0,
        max: 24,
        success: 0,
        failed: 0,
    },
};

const merge = (obj, len = 8) => {
    return Object.entries(obj).reduce((map, [key, object]) => {
        const _key = key.slice(0, len);
        const cur = map[_key];
        if (!cur) {
            map[_key] = object;
        } else {
            Object.entries(object).forEach(([_key, val]) => {
                const newKey = _key.slice(0, len);
                cur[newKey] = cur[newKey] + val;
            });
        }
        return map;
    }, {});
};

// const test = (obj) => {
//     let newObj = {};
//     for (let key in obj) {
//         if (key.slice(0, 7) in newObj) {
//             let { max: max1 } = newObj;
//             let { max } = obj[key];
//             newObj[key.slice(0, 7)] = { max: max + max1 };
//         } else {
//             newObj[key] = obj[key];
//         }
//     }
//     return newObj;
// };
