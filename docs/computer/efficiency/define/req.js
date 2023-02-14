var requirejs = require("requirejs"); //引入requirejs模块

requirejs(["1"], function(data) {
    console.log('data:', data);
});
