/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-06-08 10:24:42
 */
// var res = function(type, price) {
//     var value = 0;
//     switch (type) {
//         case 'one':
//             value = price * 2;
//             break;
//         case 'two':
//             value = price * 3;
//             break;
//         case 'three':
//             value = price * 4;
//             break;
//         default:
//             break;
//     }
//     return value
// }
// console.log('one:', res('one', 1000));
// console.log('one:', res('two', 2000));

// var performanceA = function () {}
// performanceA.prototype.getValue = (value)=>{
//     return value * 2;
// };
// var performanceB = function () {}
// performanceB.prototype.getValue = (value)=>{
//     return value * 4;
// };
// var performanceC = function () {}
// performanceC.prototype.getValue = (value)=>{
//     return value * 6;
// };

// var Bonus = function () {
//     this.value = null; // 工资
//     this.strategy = null; // 绩效计算方式
// };
// Bonus.prototype.setValue = function(value){
//     this.value = value; // 输入员工工资
// };
// Bonus.prototype.setStrategy = function(strategy){
//     this.strategy = strategy;
// };
// Bonus.prototype.get = function () {
//     return this.strategy.getValue(this.value)
// }

// var A = new Bonus()
// A.setValue(10000)
// A.setStrategy(new performanceC())
// console.log('A的钱:', A.get());

// var strategy = {
//     one: function (value) {
//         return value * 1;
//     },
//     two: function (value) {
//         return value * 2;
//     }
// };

// var bons = function (type, value) {
//     return strategy[type](value);
// };
// console.log(bons('one', 1000))
// console.log(bons('two', 2000))

var strategies = {
    isUmpty: function(value, errMsg) {
        if (value === '') {
            return errMsg ? errMsg : '内容不能为空～';
        }
    },
    isLength: function(value, length, errMsg) {
        if (value.length < length) {
            return errMsg ? errMsg : `最小长度为${length}`;
        }
    },
    isMobile: function(value, errMsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)/) {
            return errMsg ? errMsg : '格式错误，请检查一下～'
        }
    },
}

var validatorFunc = function () {
    var valudator = new valudator();
}
