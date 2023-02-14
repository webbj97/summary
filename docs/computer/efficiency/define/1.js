var requirejs = require("requirejs"); //引入requirejs模块

define(["2", "3"], function(two, three) {
    return {
        two,
        three,
    };
});

// requirejs(["2", "3"], function(two, three) {
//     two.name = "199";
//     console.log("two:", two);
//     console.log("three:", three);
//     return {
//         two,
//         three,
//     };
// });
