Array.prototype._chuck = function(size) {
    const result = [];
    const arr = this;
    let start = 0;
    while(start * size < arr.length){
        const list = arr.slice(start + size, start + size)
        result.push();
        start++
    }
};
