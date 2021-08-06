const platformProps = {
    主要颜色: "黑色",
    品牌: "慢闪",
    图案: "字母",
    图案文化: "青春",
    尺码: "S,M,L,XL,2XL,3XL",
    年份季节: "2020年夏季",
    成分含量: "71%(含)-85%(含)",
    服装版型: "宽松",
    流行元素: "印花",
    街头: "运动休闲",
    衣长: "中长款",
    袖型: "常规",
    袖长: "短袖",
    货号: "M-X0003",
    面料: "棉",
    领型: "圆领",
}

const renderList = [{
    options: [
        { name: "渐变", value: "渐变" },
        { name: "字母", value: "字母2" }
    ],
    property_id: 921642,
    property_name: "图案",
    required: false,
    type: "select",
}];

renderList.map(item => {
    const propVal = platformProps[item.property_name];
    const options = item.options;
    const index = options.findIndex(p => p.value == propVal);
    const valInPropValues = options[index]
    if(valInPropValues){
        item.value = options[index].value
    }
});