// const cal = function(type, salary) {
//     if (type === "S") return salary * 4;
//     if (type === "A") return salary * 3;
//     if (type === "B") return salary * 2;
// }


// 组合代码重构1
// function SS(salary) { return salary * 4 }
// function AA(salary) { return salary * 3 }
// function BB(salary) { return salary * 2 }
// const cal = function(type, salary) {
//     if (type === "S") return SS(salary);
//     if (type === "A") return AA(salary);
//     if (type === "B") return AA(salary);
// }
// console.log(cal("S", 1000));

// 使用策略模式重构
// 第一个版本是模仿传统面向对象语言中的实现。我们先把每种绩效的计算规则都封装在对应的策略类里面：

// const SS = function() {

// }
// SS.prototype.cal = (salary) => {
//     return salary * 4;
// }

// const AA = function() {

// }
// AA.prototype.cal = (salary) => {
//     return salary * 3;
// }

// const BB = function() {

// }
// BB.prototype.cal = (salary) => {
//     return salary * 2;
// }

// const newB = new BB()
// console.log(newB.cal(1000))

// // 还不够
// // 我们需要都设置

// const Bonus = function(){
//     this.salary = null;
//     this.strategy = null;
// }

// Bonus.prototype.setSalary = function(salary){
//     this.salary = salary;
// }

// Bonus.prototype.setStrategy = function(strategy){
//     this.strategy = strategy;
// }
// Bonus.prototype.getSalary = function () {
//     return this.strategy.cal(this.salary);
// }

// const newBonus = new Bonus()
// newBonus.setSalary(1000)
// newBonus.setStrategy(new SS())
// console.log(newBonus.getSalary())

// javaScript

const strategies = {
    S: function(salary) {
        console.log(salary * 4)
    },
    A: function(salary) {
        console.log(salary * 3)
    },
    B: function(salary) {
        console.log(salary * 2)
    },
}

const cal = (level, salary) => {
    return strategies[level](salary)
}

cal("A", 1000)