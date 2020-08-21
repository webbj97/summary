function type(value) {
    const isObj = isObject(value)
    return isObj ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        isNull(value) ? 'null' : typeof obj;
}