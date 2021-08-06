// class SaleOffices {
//     clientList = []; // 缓存订阅者的回调函数
//     listen(fn) {
//         this.clientList.push(fn); // 函数推入队列
//     }
//     trigger() {
//         for (let i = 0; i < this.clientList.length; i++) {
//             const _fn = this.clientList[i];
//             _fn.apply(this, arguments);
//         }
//     }
// }

// const saleObj = new SaleOffices()
// saleObj.listen((e) => { console.log('订阅者1', e) })
// saleObj.listen((e) => { console.log('订阅者2', e) })
// saleObj.trigger('发布者的消息')

// class SaleOffices {
//     clientList = {}; // 缓存订阅者的回调函数
//     listen(key, fn) {
//         if (!this.clientList[key]) {
//             this.clientList[key] = []; // 注意一个订阅者可以绑定由多个回调函数
//         }
//         this.clientList[key].push(fn);
//     }
//     trigger() {
//         const key = Array.prototype.shift.call(arguments); //从参数类数组里取第一个参数key
//         const fnList = this.clientList[key];

//         if (!fnList || fnList.length === 0) {
//             return false;
//         }
//         for (let i = 0; i < fnList.length; i++) {
//             fnList[i].apply(this, arguments); // 注意剩下的就是实际参数
//         }
//     }
//     remove(key, fn) {
//         const fns = this.clientList[key];
//         if (!fns) {
//             return false; // 如果没有该订阅者的记录
//         }
//         if (!fn) {
//             fns & (fns.length = 0); // 如果没传要删除的回调函数，则取消所有的
//         } else {
//             for (let i = fns.length - 1; i >= 0; i--) {
//                 if (fn === fns[i]) {
//                     fns.splice(i, 1);
//                 }
//             }
//         }

//     }
// }

// const saleObj = new SaleOffices()
// const func = (e) => { console.log(e) }
// saleObj.listen('aaa', func)
// saleObj.trigger('aaa', '我是aaa订阅消息')
// saleObj.remove('aaa', func)
// saleObj.trigger('aaa', '我是aaa订阅消息')


// const Event = (function() {
//     const clientList = {}
//     const listen = function(key, fn) {
//         if (!clientList[key]) {
//             clientList[key] = [];
//         }
//         clientList[key].push(fn);
//     }
//     const trigger = function() {
//         const key = Array.prototype.shift.call(arguments);
//         const fns = clientList[key];
//         if (!fns || fns.length === 0) {
//             return false;
//         }
//         for (let i = 0; i < fns.length; i++) {
//             fns[i].apply(this, arguments);
//         }
//     }
//     const remove = function(key, fn) {
//         const fns = clientList[key];
//         if (!fns) {
//             return false;
//         }
//         if (!fn) {
//             fns && (fns.length = 0);
//         } else {
//             for (let i = fns.length - 1; i >= 0; i--) {
//                 if (fns[i] === fn) {
//                     fns.splice(i, 1);
//                 }
//             }
//         }
//     }
//     return {
//         listen,
//         trigger,
//         remove
//     }
// })()

// Event.listen('click', function(e) { // 小红订阅消息
//     console.log('模拟触发点击时间' + e); // 输出：'价格=2000000'
// });
// Event.trigger('click', 'e');

const Event = (function() {
    const clientList = {}
    const slice = Array.prototype.slice;
    const shift = Array.prototype.shift;
    const unshift = Array.prototype.unshift;
    const listen = function(key, fn) {
        if (!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    }
    const trigger = function() {
        const key = Array.prototype.shift.call(arguments);
        const fns = clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (let i = 0; i < fns.length; i++) {
            fns[i].apply(this, arguments);
        }
    }
    const remove = function(key, fn) {
        const fns = clientList[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (let i = fns.length - 1; i >= 0; i--) {
                if (fns[i] === fn) {
                    fns.splice(i, 1);
                }
            }
        }
    }
    return {
        listen,
        trigger,
        remove
    }
})()

Event.listen('click', function(e) { // 小红订阅消息
    console.log('模拟触发点击时间' + e); // 输出：'价格=2000000'
});
Event.trigger('click', 'e');