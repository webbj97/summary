function success() {
    console.log('成功')
}

function fail() {
    console.log('失败');
}

// const p1 = new Promise((resolve, reject) => {
//     const ran = Math.random();
//     if (ran * 10 > 5) {
//         resolve(ran)
//     } else {
//         reject(ran)
//     }
// })

// Promise 新建后就会立即执行。

// p1.then(a => { console.log('成功的了', a) }).catch(a => { console.log('失败的了', a) })

// function timer (a){
//     return new Promise((resolve, reject)=>{
//         setTimeout(() => {
//             resolve()
//         }, a);
//     })
// }
// timer(1000).then(()=>console.log(1))

let p1 = new Promise(resolve => {
    setTimeout(() => {
        resolve('I\`m p1 ')
    }, 1000)
});
let p2 = new Promise(resolve => {
    setTimeout(() => {
        resolve('I\`m p2 ')
    }, 2000)
});
Promise.all([p1, p2])
    .then(value => {
        console.log(value)
    })