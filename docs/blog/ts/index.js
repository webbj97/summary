var fn = null;
function foo() {
    var a = 2;
    function innnerFoo() {
        // console.log(c);
        console.log(a);
    }
    fn = innnerFoo;
}

function bar() {
    var c = 100;
    fn();
}

foo();
bar();
