"use strict";
var MyArray = [
    { name: "余光", age: 18 },
    { name: "余光", age: 18 },
];
var APP = ["TaoBao", "Tmall", "Alipay"];
function getPhoto(app) {
    // ...
}
getPhoto("TaoBao");
getPhoto("aaa"); //类型“"aaa"”的参数不能赋给类型“"TaoBao" | "Tmall" | "Alipay"”的参数。
