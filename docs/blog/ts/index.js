function wait(waitTime = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, waitTime);
    });
}

async function waitFn(fn, repeat = 1, waitTime = 1000) {
    while (repeat--) {
        await wait(waitTime);
        fn();
    }
}

waitFn(() => console.log("重复执行"), 5, 1000);
