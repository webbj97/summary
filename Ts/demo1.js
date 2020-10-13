var reg = /\[\d*:\d*(\.|:)\d*\]/;
const str = '[11:222.33]';

const res = str.match(reg);

const arr = ['[01:22.33] 作曲 : G.E.M.邓紫棋'];

for (let i = 0; i < arr.length; i++) {
    const timeRegExpArr = arr[i].match(reg);
    const content = arr[i].replace(reg, '');
    for (let k = 0; k < timeRegExpArr.length; k++) {
        const t = timeRegExpArr[k];
        console.log('t:', t);
        const min = Number(String(t.match(/\[\d*/i)).slice(1))
        const sec = Number(String(t.match(/:\d*/i)).slice(1))
        const time = min * 60 + sec
        console.log('min:', min);
        console.log('sec:', sec);
        console.log('time:', time);
    }
}