// const imgWrap = (function() {
//     const oImg = document.createElement('img');
//     document.body.appendChild(oImg);

//     return {
//         setSrc: function(src) {
//             oImg.src = src;
//         }
//     }
// })();

// const proxyImg = (function() {
//     const oImg = new Image;
//     oImg.onload = function() {
//         imgWrap.setSrc(this.src);
//     }

//     return {
//         setSrc: function(src) {
//             imgWrap.setSrc('https://avatars3.githubusercontent.com/u/98482');
//             oImg.src = src
//         }
//     }
// })();

// proxyImg.setSrc('https://avatars0.githubusercontent.com/u/5877477');

const mult = function() {
    let res = 1;
    for (let i = 0; i < arguments.length; i++) {
        res = res * arguments[i];
    }
    return res;
}

const proxtMult = (function() {
    let cache = {};
    return function() {
        const arg = Array.prototype.join.call(arguments, ',');
        if (!cache[arg]) {
            const res = mult.apply(this, arguments);
            cache[arg] = res;
        }
        return cache[arg];
    }
})();