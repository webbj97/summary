let reg = /(.+)ing/

const str = 'eating';
console.log('test:', reg.test('eating'));
console.log('match:',str.match(reg))