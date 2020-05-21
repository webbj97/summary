/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-05-12 15:22:10
 */
function foo(num) {
    console.log('foo:', num);
    this.count++
    console.log('this:', this);
}

foo.count = 0

var i;
for(let i = 0; i < 10; i++){
    if(i > 5){
        foo(i)
    }
}

console.log('foo.count:', foo.count);